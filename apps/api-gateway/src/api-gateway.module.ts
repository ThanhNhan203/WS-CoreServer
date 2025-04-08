import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
      ClientsModule.register([
         {
            name: 'AUTH_SERVICE',
            transport: Transport.KAFKA,
            options: {
               client: {
                  clientId: 'api-gateway-client',
                  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
                  retry: {
                     initialRetryTime: 100,
                     retries: 8
                  }
               },
               consumer: {
                  groupId: 'api-gateway-group',
                  allowAutoTopicCreation: true,
                  retry: {
                     initialRetryTime: 100,
                     retries: 8
                  }
               },
               producer: {
                  allowAutoTopicCreation: true,
                  retry: {
                     initialRetryTime: 100,
                     retries: 8
                  }
               },
               subscribe: {
                  fromBeginning: true,
               },
               run: {
                  autoCommit: true,
               },
            },
         },
      ]),
   ],
   controllers: [ApiGatewayController],
   providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
