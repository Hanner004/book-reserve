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
  Query,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/utils/guards/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { QueryClientsDto } from './dto/query-clients.dto';
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
  async findAll(@Query() data: QueryClientsDto) {
    return await this.clientsService.findAll(data);
  }

  @Get('/:clientId')
  async findOne(@Param('clientId', ParseUUIDPipe) clientId: string) {
    return await this.clientsService.findOne(clientId);
  }

  @Get('/dni/:client_dni')
  async findOneByDNI(@Param('client_dni') client_dni: string) {
    return await this.clientsService.findOneByDNI(client_dni);
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
