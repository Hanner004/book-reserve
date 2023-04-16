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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

// @UseGuards(AccessTokenGuard)
// @ApiBearerAuth()
@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientsService.create(createClientDto);
  }

  @Get()
  async findAll() {
    return await this.clientsService.findAll();
  }

  @Get('/:clientId')
  async findOne(@Param('clientId', ParseUUIDPipe) clientId: string) {
    return await this.clientsService.findOne(clientId);
  }

  @Put('/:clientId')
  async update(
    @Param('clientId', ParseUUIDPipe) clientId: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientsService.update(clientId, updateClientDto);
  }

  @Delete('/:clientId')
  async remove(@Param('clientId', ParseUUIDPipe) clientId: string) {
    return await this.clientsService.remove(clientId);
  }
}
