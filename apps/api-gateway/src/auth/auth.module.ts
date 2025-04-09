import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MessagingModule } from '@app/common';

@Module({
   imports: [MessagingModule],
   providers: [AuthService],
   controllers: [AuthController],
})
export class AuthModule {}
