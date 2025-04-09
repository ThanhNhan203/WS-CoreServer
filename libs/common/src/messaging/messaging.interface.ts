import { ClientKafka } from '@nestjs/microservices';

export interface IMessagingService {
  send(pattern: string, data: any): Promise<any>;
  emit(pattern: string, data: any): void;
  subscribeToResponseOf(pattern: string): void;
  connect(): Promise<void>;
} 