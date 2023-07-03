import { EntityRepository, Repository } from 'typeorm';
import { Client, Reservation, ReservationBook } from '../entities';
import { ReservationStatusEnum } from '../enums';

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {
  async createReservation(
    clientFound: Client,
    newReservation: Reservation,
    reservationBooks: ReservationBook[],
  ) {
    const queryRunner = this.manager.connection.createQueryRunner();
    let error: any;
    await queryRunner.startTransaction();
    try {
      newReservation.client = clientFound;
      const reservationSaved = await queryRunner.manager.save(newReservation);
      for (const item of reservationBooks) {
        await queryRunner.manager.insert(ReservationBook, {
          reservation: reservationSaved,
          book: item.book,
          quantity: item.quantity,
        });
      }
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

  async getReservations(query_string: string) {
    const query = this.createQueryBuilder('reservation')
      .withDeleted()
      .leftJoinAndSelect('reservation.client', 'client')
      .leftJoinAndSelect('reservation.reservationBooks', 'reservationBooks')
      .leftJoinAndSelect('reservationBooks.book', 'book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.editorial', 'editorial');

    if (query_string) {
      query.where(
        `concat(client.name, ' ', client.lastname, ' ', client.dni, ' ', client.email, ' ', client.phone, ' ', book.name, ' ', author.name, ' ', author.lastname, ' ', editorial.name, ' ', book.isbn_code, ' ', book.library_location) ilike :query_string`,
        { query_string: `%${query_string}%` },
      );
    }

    query.orderBy('reservation.id', 'DESC');
    return await query.getRawMany();
  }

  async getReservation(reservationId: number) {
    return await this.createQueryBuilder('reservation')
      .withDeleted()
      .leftJoinAndSelect('reservation.client', 'client')
      .leftJoinAndSelect('reservation.reservationBooks', 'reservationBooks')
      .leftJoinAndSelect('reservationBooks.book', 'book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.editorial', 'editorial')
      .where('reservation.id = :reservationId', { reservationId })
      .getRawOne();
  }

  async checkActiveReservation(client_dni: string) {
    return await this.createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.client', 'client')
      .where('client.dni = :client_dni', { client_dni })
      .andWhere(`reservation.status = '${ReservationStatusEnum.ACTIVE}'`)
      .getRawOne();
  }
}
