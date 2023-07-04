import { EntityRepository, Repository } from 'typeorm';
import { ReservationBook } from '../entities';

@EntityRepository(ReservationBook)
export class ReservationBookRepository extends Repository<ReservationBook> {
  async getBooksByReservation(reservationId: number, query_string: string) {
    let query = this.createQueryBuilder('reservationBook')
      .withDeleted()
      .leftJoinAndSelect('reservationBook.reservation', 'reservation')
      .leftJoinAndSelect('reservationBook.book', 'book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.editorial', 'editorial')
      .where('reservation.id = :reservationId', { reservationId });

    if (query_string) {
      query.andWhere(
        `concat(book.name, ' ', author.name, ' ', author.lastname, ' ', editorial.name, ' ', book.isbn_code, ' ', book.library_location) ilike :query_string`,
        { query_string: `%${query_string}%` },
      );
    }

    return await query.getRawMany();
  }
}
