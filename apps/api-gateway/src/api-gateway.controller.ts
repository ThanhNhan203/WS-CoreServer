import { Controller, Get } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
   constructor(private readonly apiGatewayService: ApiGatewayService) {}

   @Get()
   getHello(): string {
      return this.apiGatewayService.getHello();
   }

   @Get('health/auth')
   checkAuthHealth() {
      return this.apiGatewayService.send('auth.health', {});
   }

   @Get('health/task-manager')
   checkTaskManagerHealth() {
      return this.apiGatewayService.send('task-manager.health', {});
   }

   @Get('health/workspace')
   checkWorkspaceHealth() {
      return this.apiGatewayService.send('workspace.health', {});
   }
}
