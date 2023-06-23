import { EntityRepository, Repository } from 'typeorm';
import { Client } from '../entities';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async getClients(query_string: string) {
    const query = this.createQueryBuilder('client');
    if (query_string) {
      query.where(
        `concat(client.name, ' ', client.lastname, ' ', client.dni, ' ', client.email, ' ', client.phone) ilike :query_string`,
        { query_string: `%${query_string}%` },
      );
    }
    query.orderBy('client.id', 'DESC');
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
