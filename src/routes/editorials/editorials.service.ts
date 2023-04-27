import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';
import { EditorialRepository } from 'src/database/repositories';

@Injectable()
export class EditorialsService {
  constructor(private editorialRepository: EditorialRepository) {}

  async create(createEditorialDto: CreateEditorialDto) {
    return await this.editorialRepository.save(
      this.editorialRepository.create(createEditorialDto),
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

  async update(editorialId: number, updateEditorialDto: UpdateEditorialDto) {
    const editorialFound = await this.editorialRepository.getEditorial(
      editorialId,
    );
    if (!editorialFound) throw new NotFoundException('editorial not found');
    return await this.editorialRepository.update(
      { id: editorialId },
      { ...updateEditorialDto },
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
