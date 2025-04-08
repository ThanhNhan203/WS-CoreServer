import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { WorkspaceServiceService } from './workspace-service.service';

@Controller()
export class WorkspaceServiceController {
  constructor(private readonly workspaceServiceService: WorkspaceServiceService) {}

  @MessagePattern('workspace.health')
  getHello(): string {
    return this.workspaceServiceService.getHello();
  }
}
