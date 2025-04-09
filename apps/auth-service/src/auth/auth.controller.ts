import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDTO, registerDTO } from '@app/dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @MessagePattern('auth.register')
   async RegisterAccount(@Payload() registerDTO: registerDTO) {
      return await this.authService.Register(registerDTO);
   }

   @MessagePattern('auth.login')
   async LoginAccount(@Payload() loginDTO: LoginDTO) {
      return await this.authService.Login(loginDTO);
   }
}
