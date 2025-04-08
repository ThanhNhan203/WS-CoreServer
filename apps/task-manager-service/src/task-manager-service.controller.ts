import { Controller, Get } from '@nestjs/common';
import { TaskManagerServiceService } from './task-manager-service.service';

@Controller()
export class TaskManagerServiceController {
  constructor(private readonly taskManagerServiceService: TaskManagerServiceService) {}

  @Get()
  getHello(): string {
    return this.taskManagerServiceService.getHello();
  }
}
