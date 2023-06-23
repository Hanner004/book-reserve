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

  async validateClient(dni: string) {
    const dniFound = await this.clientRepository.findOne({ where: { dni } });
    if (dniFound) throw new ConflictException('the client dni is registered');
  }

  async create(createClientDto: CreateClientDto) {
    await this.validateClient(createClientDto.dni);
    return await this.clientRepository.save(
      this.clientRepository.create(createClientDto),
    );
  }

  async findAll(data: QueryClientsDto) {
    return await this.clientRepository.getClients(data.query_string);
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
    const dniFound = `${clientFound.client_dni}`;
    const dto = `${updateClientDto.dni}`;
    if (dto !== dniFound) {
      await this.validateClient(updateClientDto.dni);
    }
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
