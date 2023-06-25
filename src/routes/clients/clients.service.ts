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

  async validateClientDNI(dni: string) {
    const dniFound = await this.clientRepository.findOne({ where: { dni } });
    if (dniFound) throw new ConflictException('the client dni is registered');
  }

  async validateEmailClient(email: string) {
    const emailFound = await this.clientRepository.findOne({
      where: { email },
    });
    if (emailFound)
      throw new ConflictException('the client email is registered');
  }

  async create(createClientDto: CreateClientDto) {
    await this.validateClientDNI(createClientDto.dni);
    await this.validateEmailClient(createClientDto.email);
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
    const dtoDNI = `${updateClientDto.dni}`;
    if (dtoDNI !== dniFound) {
      await this.validateClientDNI(updateClientDto.dni);
    }

    const emailFound = `${clientFound.client_email}`;
    const dtoEmail = `${updateClientDto.email}`;
    if (dtoEmail !== emailFound) {
      await this.validateEmailClient(updateClientDto.email);
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
