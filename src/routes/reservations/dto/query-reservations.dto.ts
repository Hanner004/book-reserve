import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class QueryReservationsDto {
  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  bookId: number;
  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  clientId: number;
}
