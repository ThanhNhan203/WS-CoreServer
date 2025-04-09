import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { registerDTO } from '@app/dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @MessagePattern('auth.register')
   async RegisterAccount(@Payload() registerDTO: registerDTO) {
      console.log("registerDTO", registerDTO);
      return await this.authService.register(registerDTO);
   }
}
