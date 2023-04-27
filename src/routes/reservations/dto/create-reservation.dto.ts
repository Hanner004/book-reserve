import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  bookId: number;
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  clientId: number;
}
