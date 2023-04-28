import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryBooksDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  book_name: string;
}
