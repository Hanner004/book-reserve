import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryClientsDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  query_string: string;
}
