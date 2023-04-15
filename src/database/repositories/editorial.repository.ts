import { EntityRepository, Repository } from 'typeorm';
import { Editorial } from '../entities';

@EntityRepository(Editorial)
export class EditorialRepository extends Repository<Editorial> {}
