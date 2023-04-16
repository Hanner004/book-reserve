import { ApiProperty } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateReservationDto extends CreateReservationDto {
  @ApiProperty({ default: true })
  @IsBoolean()
  @IsNotEmpty()
  is_busy: boolean;
}
