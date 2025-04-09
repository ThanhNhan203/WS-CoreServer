import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagingService } from '@app/common';
import { registerDTO } from '@app/dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly messagingService: MessagingService) {}

   @Post('register')
   Register(@Body() registerDTO: registerDTO) {
      console.log("registerDTO", registerDTO);
      return this.messagingService.send('auth.register', registerDTO);
   }
}
