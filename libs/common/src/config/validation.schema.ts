import * as Joi from 'joi';

export const validationSchema = Joi.object({
   // System Configuration
   PORT: Joi.number().default(3000),
   APP_HOST: Joi.string().default('localhost'),
   NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
   CLIENT_CORS: Joi.string().uri().default('http://localhost'),

   // Database Configuration
   DB_HOST: Joi.string().default('localhost'),
   DB_PORT: Joi.number().default(27017),
   DB_USERNAME: Joi.string().allow('', null).default(''),
   DB_PASSWORD: Joi.string().allow('', null).default(''),
   DB_NAME: Joi.string().default('API-GateWay'),

   // Kafka Configuration (Nếu bạn thêm sau này)
   // KAFKA_BROKER: Joi.string().default('localhost:9092'),
}); 