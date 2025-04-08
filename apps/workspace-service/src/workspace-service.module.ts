import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkspaceServiceController } from './workspace-service.controller';
import { WorkspaceServiceService } from './workspace-service.service';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: [
            `apps/workspace-service/.env.${process.env.NODE_ENV || 'development'}`,
            'apps/workspace-service/.env'
         ],
         load: [configuration],
         validationSchema,
         validationOptions: {
            abortEarly: false,
         },
      }),
      ClientsModule.register([
         {
            name: 'WORKSPACE_SERVICE',
            transport: Transport.KAFKA,
            options: {
               client: {
                  clientId: 'workspace-service-server',
                  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
                  retry: {
                     initialRetryTime: 100,
                     retries: 8
                  }
               },
               consumer: {
                  groupId: 'workspace-group',
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
   controllers: [WorkspaceServiceController],
   providers: [WorkspaceServiceService],
})
export class WorkspaceServiceModule {}
