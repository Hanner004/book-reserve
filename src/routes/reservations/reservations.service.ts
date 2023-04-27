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
    private bookRepository: BookRepository,
    private clientRepository: ClientRepository,
  ) {}

  async create({ bookId, clientId }: CreateReservationDto) {
    const bookFound = await this.bookRepository.findOne({
      where: { id: bookId },
    });
    if (!bookFound) throw new NotFoundException('book not found');
    const clientFound = await this.clientRepository.findOne({
      where: { id: clientId },
    });
    if (!clientFound) throw new NotFoundException('client not found');
    const { number_reservations } =
      await this.reservationRepository.getNumberOfBookReservations(bookId);
    const currentQuantity = bookFound.available_quantity - number_reservations;
    if (currentQuantity <= 0) {
      throw new ConflictException('the requested book is not available');
    }
    return await this.reservationRepository.createReservation(
      this.reservationRepository.create(),
      bookFound,
      clientFound,
    );
  }

  async findAll(data: QueryReservationsDto) {
    return await this.reservationRepository.getReservations(
      data.bookId,
      data.clientId,
    );
  }

  async findOne(reservationId: number) {
    const reservationFound = await this.reservationRepository.getReservation(
      reservationId,
    );
    if (!reservationFound) throw new NotFoundException('reservation not found');
    return reservationFound;
  }

  async update(
    reservationId: number,
    { bookId, clientId, is_busy }: UpdateReservationDto,
  ) {
    const reservationFound = await this.reservationRepository.findOne({
      where: { id: reservationId },
    });
    if (!reservationFound) throw new NotFoundException('reservation not found');
    const bookFound = await this.bookRepository.findOne({
      where: { id: bookId },
    });
    if (!bookFound) throw new NotFoundException('book not found');
    const clientFound = await this.clientRepository.findOne({
      where: { id: clientId },
    });
    if (!clientFound) throw new NotFoundException('client not found');
    return await this.reservationRepository.update(
      { id: reservationId },
      {
        book: bookFound,
        client: clientFound,
        is_busy,
      },
    );
  }

  async remove(reservationId: number) {
    const reservationFound = await this.reservationRepository.findOne({
      where: { id: reservationId },
    });
    if (!reservationFound) throw new NotFoundException('reservation not found');
    return await this.reservationRepository.update(
      { id: reservationId },
      {
        deleted_at: new Date(),
        is_deleted: true,
        is_busy: false,
      },
    );
  }
}
