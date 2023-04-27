import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { QueryClientsDto } from './dto/query-clients.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from 'src/database/repositories';

@Injectable()
export class ClientsService {
  constructor(private clientRepository: ClientRepository) {}

  async create(createClientDto: CreateClientDto) {
    try {
      return await this.clientRepository.save(
        this.clientRepository.create(createClientDto),
      );
    } catch (error) {
      throw new ConflictException(error.detail);
    }
  }

  async findAll(data: QueryClientsDto) {
    return await this.clientRepository.getClients(data.client_dni);
  }

  async findOne(clientId: number) {
    const clientFound = await this.clientRepository.getClient(clientId);
    if (!clientFound) throw new NotFoundException('client not found');
    return clientFound;
  }

  async findOneByDNI(client_dni: string) {
    const clientFound = await this.clientRepository.getClientByDNI(client_dni);
    if (!clientFound) throw new NotFoundException('client not found');
    return clientFound;
  }

  async update(clientId: number, updateClientDto: UpdateClientDto) {
    const clientFound = await this.clientRepository.getClient(clientId);
    if (!clientFound) throw new NotFoundException('client not found');
    return await this.clientRepository.update(
      { id: clientId },
      { ...updateClientDto },
    );
  }

  async remove(clientId: number) {
    const clientFound = await this.clientRepository.getClient(clientId);
    if (!clientFound) throw new NotFoundException('client not found');
    return await this.clientRepository.update(
      { id: clientId },
      { deleted_at: new Date(), is_deleted: true },
    );
  }
}
