import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryAuthorDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  query_string: string;
}
