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
import { EditorialsService } from './editorials.service';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';

// @UseGuards(AccessTokenGuard)
// @ApiBearerAuth()
@ApiTags('editorials')
@Controller('editorials')
export class EditorialsController {
  constructor(private readonly editorialsService: EditorialsService) {}

  @Post()
  async create(@Body() createEditorialDto: CreateEditorialDto) {
    return this.editorialsService.create(createEditorialDto);
  }

  @Get()
  async findAll() {
    return this.editorialsService.findAll();
  }

  @Get('/:editorialId')
  async findOne(@Param('editorialId', ParseUUIDPipe) editorialId: string) {
    return this.editorialsService.findOne(editorialId);
  }

  @Put('/:editorialId')
  async update(
    @Param('editorialId', ParseUUIDPipe) editorialId: string,
    @Body() updateEditorialDto: UpdateEditorialDto,
  ) {
    return this.editorialsService.update(editorialId, updateEditorialDto);
  }

  @Delete('/:editorialId')
  async remove(@Param('editorialId', ParseUUIDPipe) editorialId: string) {
    return this.editorialsService.remove(editorialId);
  }
}
