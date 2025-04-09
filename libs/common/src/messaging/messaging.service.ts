import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { IMessagingService } from './messaging.interface';

@Injectable()
export class MessagingService implements IMessagingService {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly client: ClientKafka,
  ) {}

  async send(pattern: string, data: any): Promise<any> {
    return this.client.send(pattern, data);
  }

  emit(pattern: string, data: any): void {
    this.client.emit(pattern, data);
  }

  subscribeToResponseOf(pattern: string): void {
    this.client.subscribeToResponseOf(pattern);
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }
} 