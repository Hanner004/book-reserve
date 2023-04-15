import { Module } from '@nestjs/common';
import { databaseProvider } from './database.service';

@Module({
  imports: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
