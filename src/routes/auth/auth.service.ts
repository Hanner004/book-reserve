import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/database/repositories';
import { LoginDto } from './dto/login.dto';

import { compareSync, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  private async getTokens(user: { id: number; role: string }) {
    const payload = { id: user.id, role: user.role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_KEY'),
        expiresIn: '12h',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_KEY'),
        expiresIn: '7d',
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async loginWeb({ email, password }: LoginDto) {
    const userFound = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'is_deleted', 'password'],
    });
    if (
      !userFound ||
      userFound.is_deleted === false ||
      (userFound && compareSync(password, userFound.password) == false)
    )
      throw new BadRequestException('email or password invalid');
    const tokens = await this.getTokens({
      id: userFound.id,
      role: userFound.role,
    });
    return { role: userFound.role, ...tokens };
  }
}
