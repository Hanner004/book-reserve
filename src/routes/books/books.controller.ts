import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
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
  async findOne(@Param('bookId', ParseUUIDPipe) bookId: string) {
    return await this.booksService.findOne(bookId);
  }

  @Put('/:bookId')
  async update(
    @Param('bookId', ParseUUIDPipe) bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.update(bookId, updateBookDto);
  }

  @Delete('/:bookId')
  async remove(@Param('bookId', ParseUUIDPipe) bookId: string) {
    return await this.booksService.remove(bookId);
  }
}
