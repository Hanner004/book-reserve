import { EntityRepository, Repository } from 'typeorm';
import { ReservationBook } from '../entities';

@EntityRepository(ReservationBook)
export class ReservationBookRepository extends Repository<ReservationBook> {
  async getBooksByReservation(reservationId: number) {
    return await this.createQueryBuilder('reservationBook')
      .withDeleted()
      .leftJoinAndSelect('reservationBook.reservation', 'reservation')
      .leftJoinAndSelect('reservationBook.book', 'book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.editorial', 'editorial')
      .where('reservation.id = :reservationId', { reservationId })
      .getRawMany();
  }
}
