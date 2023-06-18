import { EntityRepository, Repository, getManager } from 'typeorm';
import { Book, Author, Editorial, Reservation } from '../entities';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async createBook(newBook: Book, author: Author, editorial: Editorial) {
    const queryRunner = this.manager.connection.createQueryRunner();
    let error: any;
    await queryRunner.startTransaction();
    try {
      newBook.author = author;
      newBook.editorial = editorial;
      const bookSaved = await queryRunner.manager.save(newBook);
      await queryRunner.commitTransaction();
      return bookSaved;
    } catch (e) {
      error = e;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    console.log(error);
    if (error) throw error;
  }

  async getBooks(query_string: string) {

    const sq = getManager()
      .createQueryBuilder(Reservation, 'sq_reservation')
      .select('COUNT(sq_reservation.id)')
      .leftJoin('sq_reservation.book', 'sq_book')
      .where('sq_book.id = book.id')
      .andWhere('sq_reservation.is_busy = true');

    const query = this.createQueryBuilder('book')
      .select([
        'book',
        'author.name',
        'author.lastname',
        'editorial.name',
        `CAST((${sq.getQuery()}) AS INTEGER) AS book_current_amount_occupied`,
      ])
      .leftJoin('book.author', 'author')
      .leftJoin('book.editorial', 'editorial');

    if (query_string) {
      query.where(
        `concat(book.name, ' ', author.name, ' ', author.lastname, ' ', editorial.name) ilike :query_string`,
        { query_string: `%${query_string}%` },
      );
    }

    query.groupBy('book.id, author.name, author.lastname, editorial.name');
    query.orderBy('book.id', 'DESC');
    return await query.getRawMany();

  }

  async getBook(bookId: number) {

    const { book_current_amount_occupied } = await getManager()
      .createQueryBuilder(Reservation, 'sq_reservation')
      .select('COUNT(sq_reservation.id) AS book_current_amount_occupied')
      .leftJoin('sq_reservation.book', 'sq_book')
      .where('sq_book.id = :bookId', { bookId })
      .andWhere('sq_reservation.is_busy = true')
      .getRawOne();

    const book = await this.createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.editorial', 'editorial')
      .where('book.id = :bookId', { bookId })
      .getRawOne();

    return {
      ...book,
      book_current_amount_occupied: +book_current_amount_occupied,
    };
    
  }
}
