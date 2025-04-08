import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { configuration } from '@app/common';
import { validationSchema } from './config/validation.schema';
import { ClientsModule } from '@nestjs/microservices';
import { getKafkaConfig } from '@app/common';

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
      ClientsModule.registerAsync([
         {
            name: 'AUTH_SERVICE',
            useFactory: () => getKafkaConfig('auth-service-server'),
         },
      ]),
   ],
   controllers: [AuthServiceController],
   providers: [AuthServiceService],
})
export class AuthServiceModule {}
