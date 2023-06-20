import { EntityRepository, Repository } from 'typeorm';
import { Editorial } from '../entities';

@EntityRepository(Editorial)
export class EditorialRepository extends Repository<Editorial> {
  async getEditorials(query_string: string) {
    let query = this.createQueryBuilder('editorial');
    if (query_string) {
      query.where(`concat(editorial.name) ilike :query_string`, {
        query_string: `%${query_string}%`,
      });
    }
    query.orderBy('editorial.id', 'DESC');
    return await query.getRawMany();
  }

  async getEditorial(editorialId: number) {
    return await this.createQueryBuilder('editorial')
      .where('editorial.id = :editorialId', { editorialId })
      .getRawOne();
  }

  async getEditorialByName(name: string) {
    return await this.createQueryBuilder('editorial')
      .where('editorial.name = :name', { name })
      .getRawOne();
  }
}
