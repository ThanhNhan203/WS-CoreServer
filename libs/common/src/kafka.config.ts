import { KafkaOptions, Transport } from '@nestjs/microservices';

export const getKafkaConfig = (groupId: string): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'ws-core-server',
      brokers: ['localhost:9092'],
      retry: {
        initialRetryTime: 1000,
        maxRetryTime: 30000,
        retries: 5,
        factor: 2,
      },
    },
    consumer: {
      groupId,
      allowAutoTopicCreation: true,
    },
  },
}); 