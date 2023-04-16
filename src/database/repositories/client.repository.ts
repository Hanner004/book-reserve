import { EntityRepository, Repository } from 'typeorm';
import { Client } from '../entities';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async getClients() {
    return await this.createQueryBuilder('client').getRawMany();
  }

  async getClient(clientId: string) {
    return await this.createQueryBuilder('client')
      .where('client.id = :clientId', { clientId })
      .getRawOne();
  }
}
