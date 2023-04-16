import { EntityRepository, Repository } from 'typeorm';
import { Reservation, Client, Book } from '../entities';

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {
  async getReservations(bookId: string, client_dni: string) {
    const query = this.createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.client', 'client')
      .leftJoinAndSelect('reservation.book', 'book')
      .where('reservation.is_busy = :is_busy', { is_busy: true });
    if (bookId) {
      query.andWhere('book.id = :bookId', { bookId });
    }
    if (client_dni) {
      query.andWhere('client.dni = :client_dni', { client_dni });
    }
    return await query.getRawMany();
  }

  async getReservation(reservationId: string) {
    return await this.createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.client', 'client')
      .leftJoinAndSelect('reservation.book', 'book')
      .where('reservation.is_busy = :is_busy', { is_busy: true })
      .andWhere('reservation.id = :reservationId', { reservationId })
      .getRawOne();
  }

  async getNumberOfBookReservations(bookId: string) {
    const response = await this.createQueryBuilder('reservation')
      .select('COALESCE(COUNT(*), 0) AS number_reservations')
      .leftJoin('reservation.book', 'book')
      .where('book.id = :bookId', { bookId })
      .andWhere('reservation.is_busy = :is_busy', { is_busy: true })
      .getRawOne();
    return { number_reservations: +response.number_reservations };
  }

  async createReservation(
    newReservation: Reservation,
    client: Client,
    book: Book,
  ) {
    const queryRunner = this.manager.connection.createQueryRunner();
    let error: any;
    await queryRunner.startTransaction();
    try {
      newReservation.client = client;
      newReservation.book = book;
      const reservationSaved = await queryRunner.manager.save(newReservation);
      await queryRunner.commitTransaction();
      return reservationSaved;
    } catch (e) {
      error = e;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    console.log(error);
    if (error) throw error;
  }
}
