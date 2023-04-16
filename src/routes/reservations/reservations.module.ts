import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationRepository } from 'src/database/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationRepository])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
