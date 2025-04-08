import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { getKafkaConfig } from '@libs/common';

declare const module: any;

async function bootstrap() {
   const app = await NestFactory.create(AuthServiceModule);
   const configService = app.get(ConfigService);

   // Sử dụng cấu hình Kafka từ thư viện common
   const kafkaConfig = getKafkaConfig('auth-service');
   app.connectMicroservice(kafkaConfig);
   await app.startAllMicroservices();

   Logger.log(`🚀 Auth Service is running 🚀`);
   Logger.log(`🚀 Kafka microservice is connected 🚀`);

   if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
   }
}

bootstrap();
