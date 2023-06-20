import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';
import { EditorialRepository } from 'src/database/repositories';

@Injectable()
export class EditorialsService {
  constructor(private editorialRepository: EditorialRepository) {}

  async validateEditorial(name: string) {
    const editorialFound = await this.editorialRepository.getEditorialByName(
      name,
    );
    if (editorialFound)
      throw new ConflictException('the editorial name is registered');
  }

  async create({ name, description }: CreateEditorialDto) {
    await this.validateEditorial(name);
    return await this.editorialRepository.save(
      this.editorialRepository.create({ name, description }),
    );
  }

  async findAll() {
    return await this.editorialRepository.getEditorials();
  }

  async findOne(editorialId: number) {
    const editorialFound = await this.editorialRepository.getEditorial(
      editorialId,
    );
    if (!editorialFound) throw new NotFoundException('editorial not found');
    return editorialFound;
  }

  async update(editorialId: number, { name, description }: UpdateEditorialDto) {
    const editorialFound = await this.editorialRepository.getEditorial(
      editorialId,
    );
    if (!editorialFound) throw new NotFoundException('editorial not found');
    const nameFound = `${editorialFound.editorial_name}`;
    const dto = `${name}`;
    if (dto !== nameFound) {
      await this.validateEditorial(name);
    }
    return await this.editorialRepository.update(
      { id: editorialId },
      { name, description },
    );
  }

  async remove(editorialId: number) {
    const editorialFound = await this.editorialRepository.getEditorial(
      editorialId,
    );
    if (!editorialFound) throw new NotFoundException('editorial not found');
    return await this.editorialRepository.update(
      { id: editorialId },
      { deleted_at: new Date(), is_deleted: true },
    );
  }
}
