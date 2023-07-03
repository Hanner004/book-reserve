import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { QueryReservationsDto } from './dto/query-reservations.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationStatusEnum } from 'src/database/enums';
import { ReservationBook } from 'src/database/entities';
import {
  BookRepository,
  ClientRepository,
  ReservationRepository,
  ReservationBookRepository,
} from 'src/database/repositories';

@Injectable()
export class ReservationsService {
  constructor(
    private reservationRepository: ReservationRepository,
    private bookRepository: BookRepository,
    private clientRepository: ClientRepository,
    private reservationBookRepository: ReservationBookRepository,
  ) {}

  async limitReservations(client_dni: string) {
    const reservationActive =
      await this.reservationRepository.checkActiveReservation(client_dni);
    if (reservationActive)
      throw new ConflictException('client has an active reservation');
  }

  async create({ clientId, books }: CreateReservationDto) {
    const clientFound = await this.clientRepository.findOne({
      where: { id: clientId },
    });
    if (!clientFound) throw new NotFoundException('client not found');
    await this.limitReservations(clientFound.dni);
    let isEmpty = true;
    const reservationBooks: ReservationBook[] = [];
    for (const i of books) {
      const bookFound = await this.bookRepository.findOne({
        where: { id: i.bookId },
      });
      if (bookFound) {
        reservationBooks.push(
          this.reservationBookRepository.create({
            book: bookFound,
            quantity: i.quantity,
          }),
        );
        isEmpty = false;
      }
    }
    if (isEmpty) throw new BadRequestException('books should not be empty');
    return await this.reservationRepository.createReservation(
      clientFound,
      this.reservationRepository.create(),
      reservationBooks,
    );
  }

  async findAll(data: QueryReservationsDto) {
    return await this.reservationRepository.getReservations(data.query_string);
  }

  async findOne(reservationId: number) {
    const reservationFound = await this.reservationRepository.getReservation(
      reservationId,
    );
    if (!reservationFound) throw new NotFoundException('reservation not found');
    return reservationFound;
  }

  async finalize(reservationId: number) {
    const reservationFound = await this.reservationRepository.findOne({
      where: { id: reservationId },
      withDeleted: true,
    });
    if (!reservationFound) throw new NotFoundException('reservation not found');
    if (reservationFound.status !== ReservationStatusEnum.ACTIVE)
      throw new ConflictException('the reserve must be active');
    return await this.reservationRepository.update(
      { id: reservationId },
      {
        finalized_at: new Date(),
        status: ReservationStatusEnum.FINALIZED,
      },
    );
  }

  async delete(reservationId: number) {
    const reservationFound = await this.reservationRepository.findOne({
      where: { id: reservationId },
      withDeleted: true,
    });
    if (!reservationFound) throw new NotFoundException('reservation not found');
    if (reservationFound.status !== ReservationStatusEnum.ACTIVE)
      throw new ConflictException('the reserve must be active');
    return await this.reservationRepository.update(
      { id: reservationId },
      {
        deleted_at: new Date(),
        is_deleted: true,
        status: ReservationStatusEnum.DELETED,
      },
    );
  }
}
