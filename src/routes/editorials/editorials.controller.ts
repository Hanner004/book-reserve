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
import { EditorialsService } from './editorials.service';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { QueryEditorialsDto } from './dto/query-editorials.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';

// @UseGuards(AccessTokenGuard)
// @ApiBearerAuth()
@ApiTags('editorials')
@Controller('editorials')
export class EditorialsController {
  constructor(private readonly editorialsService: EditorialsService) {}

  @Post()
  async create(@Body() createEditorialDto: CreateEditorialDto) {
    return await this.editorialsService.create(createEditorialDto);
  }

  @Get()
  async findAll(@Query() data: QueryEditorialsDto) {
    return await this.editorialsService.findAll(data);
  }

  @Get('/:editorialId')
  async findOne(@Param('editorialId', ParseIntPipe) editorialId: number) {
    return await this.editorialsService.findOne(editorialId);
  }

  @Put('/:editorialId')
  async update(
    @Param('editorialId', ParseIntPipe) editorialId: number,
    @Body() updateEditorialDto: UpdateEditorialDto,
  ) {
    return await this.editorialsService.update(editorialId, updateEditorialDto);
  }

  @Delete('/:editorialId')
  async remove(@Param('editorialId', ParseIntPipe) editorialId: number) {
    return await this.editorialsService.remove(editorialId);
  }
}
