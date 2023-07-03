import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/utils/guards/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { QueryReservationsDto } from './dto/query-reservations.dto';

// @UseGuards(AccessTokenGuard)
// @ApiBearerAuth()
@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    return await this.reservationsService.create(createReservationDto);
  }

  @Get()
  async findAll(@Query() data: QueryReservationsDto) {
    return await this.reservationsService.findAll(data);
  }

  @Get('/:reservationId')
  async findOne(@Param('reservationId', ParseIntPipe) reservationId: number) {
    return await this.reservationsService.findOne(reservationId);
  }

  @Delete('/:reservationId')
  async delete(@Param('reservationId', ParseIntPipe) reservationId: number) {
    return await this.reservationsService.delete(reservationId);
  }

  @Patch('/finalize/:reservationId')
  async finalize(@Param('reservationId', ParseIntPipe) reservationId: number) {
    return await this.reservationsService.finalize(reservationId);
  }
}
