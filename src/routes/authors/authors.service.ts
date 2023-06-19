import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from 'src/database/repositories';

@Injectable()
export class AuthorsService {
  constructor(private authorRepository: AuthorRepository) {}

  async validateAuthor(name: string, lastname: string) {
    const authorFound = await this.authorRepository.getAuthorByFullName(
      name,
      lastname,
    );
    if (authorFound)
      throw new ConflictException('the author name is registered');
  }

  async create({ name, lastname }: CreateAuthorDto) {
    await this.validateAuthor(name, lastname);
    return await this.authorRepository.save(
      this.authorRepository.create({ name, lastname }),
    );
  }

  async findAll() {
    return await this.authorRepository.getAuthors();
  }

  async findOne(authorId: number) {
    const authorFound = await this.authorRepository.getAuthor(authorId);
    if (!authorFound) throw new NotFoundException('author not found');
    return authorFound;
  }

  async update(authorId: number, { name, lastname }: UpdateAuthorDto) {
    const authorFound = await this.authorRepository.getAuthor(authorId);
    if (!authorFound) throw new NotFoundException('author not found');
    const newFullName = `${authorFound.author_name} ${authorFound.author_lastname}`;
    const dto = `${name} ${lastname}`;
    if (dto !== newFullName) {
      await this.validateAuthor(name, lastname);
    }
    return await this.authorRepository.update(
      { id: authorId },
      { name, lastname },
    );
  }

  async remove(authorId: number) {
    const authorFound = await this.authorRepository.getAuthor(authorId);
    if (!authorFound) throw new NotFoundException('author not found');
    return await this.authorRepository.update(
      { id: authorId },
      { deleted_at: new Date(), is_deleted: true },
    );
  }
}
