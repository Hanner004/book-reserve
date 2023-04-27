import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/utils/guards/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

// @UseGuards(AccessTokenGuard)
// @ApiBearerAuth()
@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  async findAll() {
    return await this.booksService.findAll();
  }

  @Get('/:bookId')
  async findOne(@Param('bookId', ParseIntPipe) bookId: number) {
    return await this.booksService.findOne(bookId);
  }

  @Put('/:bookId')
  async update(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.update(bookId, updateBookDto);
  }

  @Delete('/:bookId')
  async remove(@Param('bookId', ParseIntPipe) bookId: number) {
    return await this.booksService.remove(bookId);
  }
}
