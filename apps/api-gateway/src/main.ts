import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
   const app = await NestFactory.create(ApiGatewayModule);
   const configService = app.get(ConfigService);
   const port = configService.get<number>('app.port') || 3000;
   const host = configService.get<string>('app.host');

   await app.listen(port);
   Logger.log(`🚀 API-Gateway is running on port http://${host}:${port} 🚀`);

   if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
   }
}
bootstrap();
