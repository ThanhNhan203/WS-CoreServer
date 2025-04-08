import { NestFactory } from '@nestjs/core';
import { TaskManagerServiceModule } from './task-manager-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TaskManagerServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
