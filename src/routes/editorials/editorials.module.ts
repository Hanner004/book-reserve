import { Module } from '@nestjs/common';
import { EditorialsService } from './editorials.service';
import { EditorialsController } from './editorials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorialRepository } from 'src/database/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([EditorialRepository])],
  controllers: [EditorialsController],
  providers: [EditorialsService],
})
export class EditorialsModule {}
