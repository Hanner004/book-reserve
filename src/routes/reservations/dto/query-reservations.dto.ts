import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class QueryReservationsDto {
  @ApiProperty({ required: false })
  @IsUUID('all', { each: true })
  @IsOptional()
  bookId: string;
  @ApiProperty({ required: false })
  @IsUUID('all', { each: true })
  @IsOptional()
  clientId: string;
}
