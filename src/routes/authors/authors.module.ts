import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from 'src/database/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
