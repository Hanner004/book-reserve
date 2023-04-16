import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from 'src/database/repositories';

@Injectable()
export class ReservationsService {
  constructor(private reservationRepository: ReservationRepository) {}

  async create(createReservationDto: CreateReservationDto) {}

  async findAll() {
    return await this.reservationRepository.getReservations();
  }

  async findOne(reservationId: string) {
    const reservationFound = await this.reservationRepository.getReservation(
      reservationId,
    );
    if (!reservationFound) throw new NotFoundException('reservation not found');
    return reservationFound;
  }

  async update(
    reservationId: string,
    updateReservationDto: UpdateReservationDto,
  ) {}

  async remove(reservationId: string) {}
}
