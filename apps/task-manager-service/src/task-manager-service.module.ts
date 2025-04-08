import { Module } from '@nestjs/common';
import { TaskManagerServiceController } from './task-manager-service.controller';
import { TaskManagerServiceService } from './task-manager-service.service';

@Module({
  imports: [],
  controllers: [TaskManagerServiceController],
  providers: [TaskManagerServiceService],
})
export class TaskManagerServiceModule {}
