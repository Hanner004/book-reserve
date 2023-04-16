import { EntityRepository, Repository } from 'typeorm';
import { Reservation } from '../entities';

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {
  async getReservations() {
    return await this.createQueryBuilder('reservation').getRawMany();
  }

  async getReservation(reservationId: string) {
    return await this.createQueryBuilder('reservation')
      .where('reservation.id = :reservationId', { reservationId })
      .getRawOne();
  }
}
