import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from 'src/database/repositories';

@Injectable()
export class AuthorsService {
  constructor(private authorRepository: AuthorRepository) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return await this.authorRepository.save(
      this.authorRepository.create(createAuthorDto),
    );
  }

  async findAll() {
    return await this.authorRepository.getAuthors();
  }

  async findOne(authorId: string) {
    const authorFound = await this.authorRepository.getAuthor(authorId);
    if (!authorFound) throw new NotFoundException('author not found');
    return authorFound;
  }

  async update(authorId: string, updateAuthorDto: UpdateAuthorDto) {
    const authorFound = await this.authorRepository.getAuthor(authorId);
    if (!authorFound) throw new NotFoundException('author not found');
    return await this.authorRepository.update(
      { id: authorId },
      { ...updateAuthorDto },
    );
  }

  async remove(authorId: string) {
    const authorFound = await this.authorRepository.getAuthor(authorId);
    if (!authorFound) throw new NotFoundException('author not found');
    return await this.authorRepository.update(
      { id: authorId },
      { deleted_at: new Date(), is_deleted: true },
    );
  }
}
