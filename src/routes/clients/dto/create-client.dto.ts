import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: '123456789' })
  @IsString()
  @IsNotEmpty()
  dni: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @ApiProperty({ example: 'testing@book.com' })
  @IsString()
  @IsOptional()
  email: string;
  @ApiProperty({ example: '+573003001234' })
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}
