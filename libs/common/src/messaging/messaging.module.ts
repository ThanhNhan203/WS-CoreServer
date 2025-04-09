import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { ClientsModule } from '@nestjs/microservices';
import { getKafkaConfig } from '../kafka.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_CLIENT',
        useFactory: () => getKafkaConfig('messaging-client'),
      },
    ]),
  ],
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {} 