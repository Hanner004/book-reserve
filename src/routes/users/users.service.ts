import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { hashSync } from 'bcryptjs';
import { UserRepository } from 'src/database/repositories';
import { UserRoleEnum } from 'src/database/enums';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async createAdministrator({ email, password }: CreateUserDto) {
    const userEmailFound = await this.userRepository.findOne({
      where: { email },
    });
    if (userEmailFound) throw new ConflictException('email already exists');
    const user = await this.userRepository.save(
      this.userRepository.create({
        email,
        password: hashSync(password, 10),
        role: UserRoleEnum.ADMINISTRATOR,
      }),
    );
    delete user.password;
    return user;
  }
}
