import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkspaceServiceController } from './workspace-service.controller';
import { WorkspaceServiceService } from './workspace-service.service';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { ClientsModule } from '@nestjs/microservices';
import { getKafkaConfig } from '@libs/common';

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
      ClientsModule.registerAsync([
         {
            name: 'WORKSPACE_SERVICE',
            useFactory: () => getKafkaConfig('workspace-service-server'),
         },
      ]),
   ],
   controllers: [WorkspaceServiceController],
   providers: [WorkspaceServiceService],
})
export class WorkspaceServiceModule {}
