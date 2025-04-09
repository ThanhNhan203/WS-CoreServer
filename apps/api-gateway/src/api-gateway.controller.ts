import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { MessagingService } from '@app/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class ApiGatewayController {
   constructor(
      private readonly apiGatewayService: ApiGatewayService,
      private readonly messagingService: MessagingService,
   ) {}

   @Get()
   getHello(): string {
      return this.apiGatewayService.getHello();
   }

   @Get('protected-route')
   @UseGuards(AuthGuard('jwt'))
   protectedRoute(@Request() req) {
      return {
         message: 'This is a protected route',
         user: req.user,
         IDUser: req.user.IDUser,
      };
   }

   @Get('health/auth-service')
   checkAuthHealth() {
      return this.messagingService.send('auth.health', {});
   }

   @Get('health/task-manager-service')
   checkTaskManagerHealth() {
      return this.messagingService.send('task-manager.health', {});
   }

   @Get('health/workspace-service')
   checkWorkspaceHealth() {
      return this.messagingService.send('workspace.health', {});
   }
}
