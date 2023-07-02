import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BookRepository,
  ClientRepository,
  ReservationBookRepository,
  ReservationRepository,
} from 'src/database/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationRepository,
      BookRepository,
      ClientRepository,
      ReservationBookRepository,
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
