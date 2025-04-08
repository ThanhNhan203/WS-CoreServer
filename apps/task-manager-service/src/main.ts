import { NestFactory } from '@nestjs/core';
import { TaskManagerServiceModule } from './task-manager-service.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(TaskManagerServiceModule);
  const configService = app.get(ConfigService);

  const kafkaBroker =
    configService.get<string>('kafka.broker') || 'localhost:9092';
  const kafkaClientId =
    configService.get<string>('kafka.clientId') || 'task-manager-service';
  const kafkaGroupId =
    configService.get<string>('kafka.groupId') || 'task-manager-group';

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: kafkaClientId,
        brokers: [kafkaBroker],
      },
      consumer: {
        groupId: kafkaGroupId,
      },
    },
  });

  await app.startAllMicroservices();

  Logger.log(`🚀 Task Manager Service is running 🚀`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
