import { NestFactory } from '@nestjs/core';
import { WorkspaceServiceModule } from './workspace-service.module';
import { Logger } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(WorkspaceServiceModule);
  const PORT = process.env.port ?? 3002;
  await app.listen(PORT);
  Logger.log(`🚀 Workspace Service is running on port ${PORT} 🚀`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
