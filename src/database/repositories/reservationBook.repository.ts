import { EntityRepository, Repository } from 'typeorm';
import { ReservationBook } from '../entities';

@EntityRepository(ReservationBook)
export class ReservationBookRepository extends Repository<ReservationBook> {}
