import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: [
            `apps/auth-service/.env.${process.env.NODE_ENV || 'development'}`,
            'apps/auth-service/.env'
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
                  clientId: 'auth-service-server',
                  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
                  retry: {
                     initialRetryTime: 100,
                     retries: 8
                  }
               },
               consumer: {
                  groupId: 'auth-group',
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
   controllers: [AuthServiceController],
   providers: [AuthServiceService],
})
export class AuthServiceModule {}
