import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/utils/guards/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EditorialsService } from './editorials.service';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';

@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags('editorials')
@Controller('editorials')
export class EditorialsController {
  constructor(private readonly editorialsService: EditorialsService) {}

  @Post()
  create(@Body() createEditorialDto: CreateEditorialDto) {
    return this.editorialsService.create(createEditorialDto);
  }

  @Get()
  findAll() {
    return this.editorialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.editorialsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEditorialDto: UpdateEditorialDto,
  ) {
    return this.editorialsService.update(+id, updateEditorialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.editorialsService.remove(+id);
  }
}
