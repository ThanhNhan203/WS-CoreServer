import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ApiGatewayService implements OnModuleInit {
   constructor(
      @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
   ) {}

   async onModuleInit() {
      this.authClient.subscribeToResponseOf('auth.health');
      this.authClient.subscribeToResponseOf('task-manager.health');
      this.authClient.subscribeToResponseOf('workspace.health');
      await this.authClient.connect();
   }

   getHello(): string {
      return '🚀 API-Gateway is running 🚀';
   }

   send(pattern: string, data: any) {
      return this.authClient.send(pattern, data);
   }

}
