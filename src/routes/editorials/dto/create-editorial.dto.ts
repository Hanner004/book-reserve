import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { capitalizeFirstLetter } from 'src/utils/functions/formatString';

export class CreateEditorialDto {
  @ApiProperty({ example: 'Editorial Pre-textos' })
  @Transform(({ value }) => capitalizeFirstLetter(value))
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example:
      'Narrativa, ensayo, poesía y creación literaria y reflexión artística y filosófica',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
