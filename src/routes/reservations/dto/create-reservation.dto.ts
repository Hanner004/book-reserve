import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsPositive,
  ValidateNested,
} from 'class-validator';

class BookInfo {
  @ApiProperty({ example: 1 })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  bookId: number;
  @ApiProperty({ example: 1 })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}

export class CreateReservationDto {
  @ApiProperty({ example: 1 })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  clientId: number;
  @ApiProperty({ type: [BookInfo] })
  @ValidateNested({ each: true })
  @Type(() => BookInfo)
  @ArrayNotEmpty()
  books: BookInfo[];
}
