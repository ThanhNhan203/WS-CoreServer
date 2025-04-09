import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagingService } from '@app/common';
import { LoginDTO, registerDTO } from '@app/dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly messagingService: MessagingService) {}

   @Post('register')
   Register(@Body() registerDTO: registerDTO) {
      return this.messagingService.send('auth.register', registerDTO);
   }

   @Post('login')
   Login(@Body() loginDTO: LoginDTO) {
      return this.messagingService.send('auth.login', loginDTO);
   }
}
