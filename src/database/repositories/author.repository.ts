import { EntityRepository, Repository } from 'typeorm';
import { Author } from '../entities';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
  async getAuthors(query_string: string) {
    let query = this.createQueryBuilder('author');
    if (query_string) {
      query.where(
        `concat(author.name, ' ', author.lastname) ilike :query_string`,
        { query_string: `%${query_string}%` },
      );
    }
    query.orderBy('author.id', 'DESC');
    return await query.getRawMany();
  }

  async getAuthor(authorId: number) {
    return await this.createQueryBuilder('author')
      .where('author.id = :authorId', { authorId })
      .getRawOne();
  }

  async getAuthorByFullName(name: string, lastname: string) {
    return await this.createQueryBuilder('author')
      .where('author.name = :name', { name })
      .andWhere('author.lastname = :lastname', { lastname })
      .getRawOne();
  }
}
