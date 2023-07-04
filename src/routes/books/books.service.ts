import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBooksDto } from './dto/query-books.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  BookRepository,
  AuthorRepository,
  EditorialRepository,
  ReservationBookRepository,
} from 'src/database/repositories';

@Injectable()
export class BooksService {
  constructor(
    private bookRepository: BookRepository,
    private authorRepository: AuthorRepository,
    private editorialRepository: EditorialRepository,
    private reservationBookRepository: ReservationBookRepository,
  ) {}

  async validateBook(name: string) {
    const bookFound = await this.bookRepository.getBookByName(name);
    if (bookFound) throw new ConflictException('the book name is registered');
  }

  async create({ authorId, editorialId, ...createBookDto }: CreateBookDto) {
    const authorFound = await this.authorRepository.findOne({
      where: { id: authorId },
    });
    if (!authorFound) throw new NotFoundException('author not found');
    const editorialFound = await this.editorialRepository.findOne({
      where: { id: editorialId },
    });
    if (!editorialFound) throw new NotFoundException('editorial not found');
    await this.validateBook(createBookDto.name);
    try {
      return await this.bookRepository.createBook(
        this.bookRepository.create({ ...createBookDto }),
        authorFound,
        editorialFound,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(data: QueryBooksDto) {
    return await this.bookRepository.getBooks(data.query_string);
  }

  async findBooksByReservation(reservationId: number) {
    return await this.reservationBookRepository.getBooksByReservation(
      reservationId,
    );
  }

  async findOne(bookId: number) {
    const bookFound = await this.bookRepository.getBook(bookId);
    if (!bookFound) throw new NotFoundException('book not found');
    return bookFound;
  }

  async update(
    bookId: number,
    { authorId, editorialId, ...updateBookDto }: UpdateBookDto,
  ) {
    const bookFound = await this.bookRepository.getBook(bookId);
    if (!bookFound) throw new NotFoundException('book not found');
    const authorFound = await this.authorRepository.findOne({
      where: { id: authorId },
    });
    if (!authorFound) throw new NotFoundException('author not found');
    const editorialFound = await this.editorialRepository.findOne({
      where: { id: editorialId },
    });
    if (!editorialFound) throw new NotFoundException('editorial not found');
    const nameBookFound = `${bookFound.book_name}`;
    const dto = `${updateBookDto.name}`;
    if (dto !== nameBookFound) {
      await this.validateBook(updateBookDto.name);
    }
    return await this.bookRepository.update(
      { id: bookId },
      {
        author: authorFound,
        editorial: editorialFound,
        ...updateBookDto,
      },
    );
  }

  async remove(bookId: number) {
    const bookFound = await this.bookRepository.getBook(bookId);
    if (!bookFound) throw new NotFoundException('book not found');
    return await this.bookRepository.update(
      { id: bookId },
      { deleted_at: new Date(), is_deleted: true },
    );
  }
}
