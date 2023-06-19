import { EntityRepository, Repository } from 'typeorm';
import { Editorial } from '../entities';

@EntityRepository(Editorial)
export class EditorialRepository extends Repository<Editorial> {
  async getEditorials() {
    return await this.createQueryBuilder('editorial')
      .orderBy('editorial.id', 'DESC')
      .getRawMany();
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
