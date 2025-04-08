import { NestFactory } from '@nestjs/core';
import { WorkspaceServiceModule } from './workspace-service.module';
import { Logger } from '@nestjs/common';
import { getKafkaConfig } from '@app/common';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(WorkspaceServiceModule);
  const kafkaConfig = getKafkaConfig('workspace-service');
  
  app.connectMicroservice(kafkaConfig);
  await app.startAllMicroservices();
  Logger.log(`🚀 Workspace Service is running 🚀`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
