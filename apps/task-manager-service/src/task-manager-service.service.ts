import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskManagerServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
