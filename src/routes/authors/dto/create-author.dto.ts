import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ example: 'Gabriel' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'García' })
  @IsString()
  @IsNotEmpty()
  lastname: string;
}
