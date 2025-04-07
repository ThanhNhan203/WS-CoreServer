import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: [`apps/api-gateway/.env.${process.env.NODE_ENV || 'development'}`, 'apps/api-gateway/.env'],
         load: [configuration],
         validationSchema,
         validationOptions: {
            abortEarly: false,
         },
      }),
   ],
   controllers: [ApiGatewayController],
   providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
