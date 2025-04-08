import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TaskManagerServiceService } from './task-manager-service.service';

@Controller()
export class TaskManagerServiceController {
  constructor(private readonly taskManagerServiceService: TaskManagerServiceService) {}

  @MessagePattern('task-manager.health')
  getHello(): string {
    return this.taskManagerServiceService.getHello();
  }
}
