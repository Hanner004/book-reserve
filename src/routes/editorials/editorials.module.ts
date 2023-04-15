import { Module } from '@nestjs/common';
import { EditorialsService } from './editorials.service';
import { EditorialsController } from './editorials.controller';

@Module({
  controllers: [EditorialsController],
  providers: [EditorialsService],
})
export class EditorialsModule {}
