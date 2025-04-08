import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthServiceService } from './auth-service.service';

@Controller()
export class AuthServiceController {
   constructor(private readonly authServiceService: AuthServiceService) {}

   @MessagePattern('auth.health')
   getHello(): string {
      return this.authServiceService.getHello();
   }

}
