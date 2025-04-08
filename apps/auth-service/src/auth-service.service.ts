import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthServiceService {
   getHello(): string {
      return '🚀 Auth Service is running 🚀';
   }
}
