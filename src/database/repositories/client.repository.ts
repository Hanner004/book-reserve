import { EntityRepository, Repository } from 'typeorm';
import { Client } from '../entities';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async getClients(client_dni: string) {
    const query = this.createQueryBuilder('client');
    if (client_dni) {
      query.where('client.dni = :client_dni', { client_dni });
    }
    return await query.getRawMany();
  }

  async getClient(clientId: number) {
    return await this.createQueryBuilder('client')
      .where('client.id = :clientId', { clientId })
      .getRawOne();
  }

  async getClientByDNI(client_dni: string) {
    return await this.createQueryBuilder('client')
      .where('client.dni = :client_dni', { client_dni })
      .getRawOne();
  }
}
