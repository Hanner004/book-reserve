import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ReservationStatusEnum } from 'src/database/enums';

export class QueryReservationsDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  query_string: string;
  @ApiProperty({ enum: ReservationStatusEnum, required: false })
  @IsEnum(ReservationStatusEnum)
  @IsOptional()
  status: ReservationStatusEnum;
}
