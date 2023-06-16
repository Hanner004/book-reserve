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

  async getBooks(book_name: string) {
    
    const sq = getManager()
      .createQueryBuilder(Reservation, 'sq_reservation')
      .select('COUNT(sq_reservation.id)')
      .leftJoin('sq_reservation.book', 'sq_book')
      .where('sq_book.id = book.id')
      .andWhere('sq_reservation.is_busy = true');

    const query = this.createQueryBuilder('book').select([
      'book',
      `CAST((${sq.getQuery()}) AS INTEGER) AS book_current_amount_occupied`,
    ]);

    if (book_name) {
      query.where('book.name ilike :book_name', {
        book_name: `%${book_name}%`,
      });
    }

    query.groupBy('book.id');
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
