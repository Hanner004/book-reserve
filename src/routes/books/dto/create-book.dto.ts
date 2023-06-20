import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsPositive, IsInt } from 'class-validator';
import { capitalizeFirstLetter } from 'src/utils/functions/formatString';

export class CreateBookDto {
  @ApiProperty({ example: 'Cien años de soledad' })
  @Transform(({ value }) => capitalizeFirstLetter(value))
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
  @ApiProperty({ example: 1 })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  authorId: number;
  @ApiProperty({ example: 1 })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  editorialId: number;
}
