import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ example: 1 })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  bookId: number;
  @ApiProperty({ example: 1 })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  clientId: number;
}
