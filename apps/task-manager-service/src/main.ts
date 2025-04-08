import { NestFactory } from '@nestjs/core';
import { TaskManagerServiceModule } from './task-manager-service.module';
import { Logger } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(TaskManagerServiceModule);
  const PORT = process.env.port ?? 3001;
  await app.listen(PORT);
  Logger.log(`🚀 Task Manager Service is running on port ${PORT} 🚀`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
