import { EntityRepository, Repository } from 'typeorm';
import { Author } from '../entities';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
  async getAuthors() {
    return await this.createQueryBuilder('author')
      .orderBy('author.created_at', 'DESC')
      .getRawMany();
  }

  async getAuthor(authorId: number) {
    return await this.createQueryBuilder('author')
      .where('author.id = :authorId', { authorId })
      .getRawOne();
  }
}
