import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskManagerServiceController } from './task-manager-service.controller';
import { TaskManagerServiceService } from './task-manager-service.service';
import { configuration, validationSchema } from '@app/common';
import { ClientsModule } from '@nestjs/microservices';
import { getKafkaConfig } from '@app/common';

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
      ClientsModule.registerAsync([
         {
            name: 'TASK_MANAGER_SERVICE',
            useFactory: () => getKafkaConfig('task-manager-service-server'),
         },
      ]),
   ],
   controllers: [TaskManagerServiceController],
   providers: [TaskManagerServiceService],
})
export class TaskManagerServiceModule {}
