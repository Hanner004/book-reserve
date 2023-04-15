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
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

// @UseGuards(AccessTokenGuard)
// @ApiBearerAuth()
@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  async findAll() {
    return this.authorsService.findAll();
  }

  @Get('/:authorId')
  async findOne(@Param('authorId', ParseUUIDPipe) authorId: string) {
    return this.authorsService.findOne(authorId);
  }

  @Put('/:authorId')
  async update(
    @Param('authorId', ParseUUIDPipe) authorId: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsService.update(authorId, updateAuthorDto);
  }

  @Delete('/:authorId')
  async remove(@Param('authorId', ParseUUIDPipe) authorId: string) {
    return this.authorsService.remove(authorId);
  }
}
