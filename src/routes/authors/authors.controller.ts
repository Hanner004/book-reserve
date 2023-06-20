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
  Query,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/utils/guards/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { QueryAuthorDto } from './dto/query-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

// @UseGuards(AccessTokenGuard)
// @ApiBearerAuth()
@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return await this.authorsService.create(createAuthorDto);
  }

  @Get()
  async findAll(@Query() data: QueryAuthorDto) {
    return await this.authorsService.findAll(data);
  }

  @Get('/:authorId')
  async findOne(@Param('authorId', ParseIntPipe) authorId: number) {
    return await this.authorsService.findOne(authorId);
  }

  @Put('/:authorId')
  async update(
    @Param('authorId', ParseIntPipe) authorId: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return await this.authorsService.update(authorId, updateAuthorDto);
  }

  @Delete('/:authorId')
  async remove(@Param('authorId', ParseIntPipe) authorId: number) {
    return await this.authorsService.remove(authorId);
  }
}
