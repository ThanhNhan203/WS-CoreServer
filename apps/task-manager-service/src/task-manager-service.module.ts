import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskManagerServiceController } from './task-manager-service.controller';
import { TaskManagerServiceService } from './task-manager-service.service';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: [
            `apps/task-manager-service/.env.${process.env.NODE_ENV || 'development'}`,
            'apps/task-manager-service/.env'
         ],
         load: [configuration],
         validationSchema,
         validationOptions: {
            abortEarly: false,
         },
      }),
      ClientsModule.register([
         {
            name: 'TASK_MANAGER_SERVICE',
            transport: Transport.KAFKA,
            options: {
               client: {
                  clientId: 'task-manager-service-server',
                  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
                  retry: {
                     initialRetryTime: 100,
                     retries: 8
                  }
               },
               consumer: {
                  groupId: 'task-manager-group',
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
   controllers: [TaskManagerServiceController],
   providers: [TaskManagerServiceService],
})
export class TaskManagerServiceModule {}
