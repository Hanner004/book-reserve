import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { BasicStrategy as Strategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    { ...req },
    username: string,
    password: string,
  ): Promise<boolean> {
    if (
      this.configService.get<string>('HTTP_BASIC_USER') === username &&
      this.configService.get<string>('HTTP_BASIC_PASS') === password
    ) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
