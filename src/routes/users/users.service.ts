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
    try {
      const newAdmin = this.userRepository.create({
        email,
        password: hashSync(password, 10),
        role: UserRoleEnum.ADMINISTRATOR,
      });
      const user = await this.userRepository.save(newAdmin);
      delete user.password;
      return user;
    } catch (error) {
      // console.log(error);
      throw new ConflictException('email already exists');
    }
  }
}
