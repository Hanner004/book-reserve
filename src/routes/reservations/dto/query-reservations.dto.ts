import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryReservationsDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  bookId: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  client_dni: string;
}
