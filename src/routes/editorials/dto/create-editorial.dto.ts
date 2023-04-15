import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEditorialDto {
  @ApiProperty({ example: 'Editorial Pre-textos' })
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
