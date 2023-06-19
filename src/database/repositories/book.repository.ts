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

  async queryBooks(query_string: string) {
    if (!query_string) {
      query_string = ``;
    }
    return await this.query(
      `
      select
        "book"."created_at" as "book_created_at",
        "book"."updated_at" as "book_updated_at",
        "book"."deleted_at" as "book_deleted_at",
        "book"."is_deleted" as "book_is_deleted",
        "book"."id" as "book_id",
        "book"."name" as "book_name",
        "book"."available_quantity" as "book_available_quantity",
        "book"."library_location" as "book_library_location",
        "book"."authorId" as "book_authorId",
        "book"."editorialId" as "book_editorialId",
        "author"."name" as "author_name",
        "author"."lastname" as "author_lastname",
        "editorial"."name" as "editorial_name",
        cast((select COUNT("sq_reservation"."id") from "reservation" "sq_reservation" left join "book" "sq_book" on "sq_book"."id" = "sq_reservation"."bookId" and ("sq_book"."deleted_at" is null) where ( "sq_book"."id" = "book"."id" and "sq_reservation"."is_busy" = true ) and ( "sq_reservation"."deleted_at" is null )) as INTEGER) as book_current_amount_occupied
      from
        "book" "book"
      left join "author" "author" on
        "author"."id" = "book"."authorId"
      left join "editorial" "editorial" on
        "editorial"."id" = "book"."editorialId"
      where
        ( concat("book"."name", ' ', "author"."name", ' ', "author"."lastname", ' ', "editorial"."name") ilike '%${query_string}%' )
        and ( "book"."deleted_at" is null )
      group by
        "book"."id",
        "author"."name",
        "author"."lastname",
        "editorial"."name"
      order by
        "book"."id" desc
    `,
    );
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

    const queryBook = await this.query(
      `
      select
        "book"."created_at" as "book_created_at",
        "book"."updated_at" as "book_updated_at",
        "book"."deleted_at" as "book_deleted_at",
        "book"."is_deleted" as "book_is_deleted",
        "book"."id" as "book_id",
        "book"."name" as "book_name",
        "book"."available_quantity" as "book_available_quantity",
        "book"."library_location" as "book_library_location",
        "book"."authorId" as "book_authorId",
        "book"."editorialId" as "book_editorialId",
        "author"."created_at" as "author_created_at",
        "author"."updated_at" as "author_updated_at",
        "author"."deleted_at" as "author_deleted_at",
        "author"."is_deleted" as "author_is_deleted",
        "author"."id" as "author_id",
        "author"."name" as "author_name",
        "author"."lastname" as "author_lastname",
        "editorial"."created_at" as "editorial_created_at",
        "editorial"."updated_at" as "editorial_updated_at",
        "editorial"."deleted_at" as "editorial_deleted_at",
        "editorial"."is_deleted" as "editorial_is_deleted",
        "editorial"."id" as "editorial_id",
        "editorial"."name" as "editorial_name",
        "editorial"."description" as "editorial_description"
      from
        "book" "book"
      left join "author" "author" on
        "author"."id" = "book"."authorId"
      left join "editorial" "editorial" on
        "editorial"."id" = "book"."editorialId"
      where
        ( "book"."id" = ${bookId} )
        and ( "book"."deleted_at" is null )
    `,
    );

    if (queryBook[0]) {
      return {
        ...queryBook[0],
        book_current_amount_occupied: +book_current_amount_occupied,
      };
    }
    return queryBook[0];

  }
}
