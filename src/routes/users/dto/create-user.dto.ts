import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'testing@book.com' })
  @IsEmail()
  @IsNotEmpty()
  @IsLowercase()
  email: string;
  @ApiProperty({ example: 'Qwerty123*' })
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  password: string;
}
