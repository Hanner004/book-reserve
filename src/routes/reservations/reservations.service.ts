import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { QueryReservationsDto } from './dto/query-reservations.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import {
  BookRepository,
  ClientRepository,
  ReservationRepository,
} from 'src/database/repositories';

@Injectable()
export class ReservationsService {
  constructor(
    private reservationRepository: ReservationRepository,
    private BookRepository: BookRepository,
    private clientRepository: ClientRepository,
  ) {}

  async create({ bookId, client_dni }: CreateReservationDto) {
    const clientFound = await this.clientRepository.findOne({
      where: { dni: client_dni },
    });
    if (!clientFound) throw new NotFoundException('client not found');
    const bookFound = await this.BookRepository.findOne({
      where: { id: bookId },
    });
    if (!bookFound) throw new NotFoundException('book not found');
    const { number_reservations } =
      await this.reservationRepository.getNumberOfBookReservations(bookId);
    const currentQuantity = bookFound.available_quantity - number_reservations;
    if (currentQuantity <= 0) {
      throw new ConflictException('the requested book is not available');
    }
    return await this.reservationRepository.createReservation(
      this.reservationRepository.create(),
      clientFound,
      bookFound,
    );
  }

  async findAll(data: QueryReservationsDto) {
    return await this.reservationRepository.getReservations(
      data.bookId,
      data.client_dni,
    );
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