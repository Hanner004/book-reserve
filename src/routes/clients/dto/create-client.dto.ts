import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { capitalizeFirstLetter } from 'src/utils/functions/formatString';

function trimString(str: string) {
  return str.trim();
}

export class CreateClientDto {
  @ApiProperty({ example: '123456789' })
  @Transform(({ value }) => trimString(value))
  @IsString()
  @IsNotEmpty()
  dni: string;
  @ApiProperty()
  @Transform(({ value }) => capitalizeFirstLetter(value))
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @Transform(({ value }) => capitalizeFirstLetter(value))
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @ApiProperty({ example: 'testing@book.com' })
  @IsEmail()
  @IsNotEmpty()
  @IsLowercase()
  email: string;
  @ApiProperty({ example: '+573003001234' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  data_processing: boolean;
}
