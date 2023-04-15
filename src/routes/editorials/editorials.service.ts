import { Injectable } from '@nestjs/common';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';

@Injectable()
export class EditorialsService {
  create(createEditorialDto: CreateEditorialDto) {
    return 'This action adds a new editorial';
  }

  findAll() {
    return `This action returns all editorials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} editorial`;
  }

  update(id: number, updateEditorialDto: UpdateEditorialDto) {
    return `This action updates a #${id} editorial`;
  }

  remove(id: number) {
    return `This action removes a #${id} editorial`;
  }
}
