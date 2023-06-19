import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { capitalizeFirstLetter } from 'src/utils/functions/formatString';

export class CreateAuthorDto {
  @ApiProperty({ example: 'Gabriel' })
  @Transform(({ value }) => capitalizeFirstLetter(value))
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'García' })
  @Transform(({ value }) => capitalizeFirstLetter(value))
  @IsString()
  @IsNotEmpty()
  lastname: string;
}
