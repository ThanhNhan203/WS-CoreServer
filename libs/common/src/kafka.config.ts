import { KafkaOptions, Transport } from '@nestjs/microservices';

export const getKafkaConfig = (groupId: string): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'core-server',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId,
      allowAutoTopicCreation: true,
    },
  },
}); 