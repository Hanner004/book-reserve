import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsPositive,
  IsUUID,
  IsInt,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Cien años de soledad' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 10 })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  available_quantity: number;
  @ApiProperty({ example: 'MESA #1' })
  @IsString()
  @IsNotEmpty()
  library_location: string;
  @ApiProperty({ example: 'UUID' })
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  authorId: string;
  @ApiProperty({ example: 'UUID' })
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  editorialId: string;
}
