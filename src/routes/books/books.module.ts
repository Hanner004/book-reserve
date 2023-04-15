import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthorRepository,
  BookRepository,
  EditorialRepository,
} from 'src/database/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookRepository,
      AuthorRepository,
      EditorialRepository,
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
