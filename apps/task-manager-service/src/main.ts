import { NestFactory } from '@nestjs/core';
import { TaskManagerServiceModule } from './task-manager-service.module';
import { Logger } from '@nestjs/common';
import { getKafkaConfig } from '@app/common';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(TaskManagerServiceModule);
  const kafkaConfig = getKafkaConfig('task-manager-service');

  app.connectMicroservice(kafkaConfig);
  await app.startAllMicroservices();
  Logger.log(`🚀 Task Manager Service is running 🚀`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
