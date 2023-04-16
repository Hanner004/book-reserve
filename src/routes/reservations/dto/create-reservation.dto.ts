import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ example: 'UUID' })
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  bookId: string;
  @ApiProperty({ example: 'DNI' })
  @IsString()
  @IsNotEmpty()
  client_dni: string;
}
