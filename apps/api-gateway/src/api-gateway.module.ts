import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { ClientsModule } from '@nestjs/microservices';
import { getKafkaConfig } from '@libs/common';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: [
            `apps/api-gateway/.env.${process.env.NODE_ENV || 'development'}`,
            'apps/api-gateway/.env'
         ],
         load: [configuration],
         validationSchema,
         validationOptions: {
            abortEarly: false,
         },
      }),
      ClientsModule.registerAsync([
         {
            name: 'AUTH_SERVICE',
            useFactory: () => getKafkaConfig('api-gateway-client'),
         },
      ]),
   ],
   controllers: [ApiGatewayController],
   providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
