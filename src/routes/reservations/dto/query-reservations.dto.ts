import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsPositive } from 'class-validator';

export class QueryReservationsDto {
  @ApiProperty({ required: false })
  @IsNumberString()
  @IsPositive()
  @IsOptional()
  bookId: number;
  @ApiProperty({ required: false })
  @IsNumberString()
  @IsPositive()
  @IsOptional()
  clientId: number;
}
