import * as Joi from 'joi';

export const validationSchema = Joi.object({
   // System Configuration
   PORT: Joi.number().default(3002),
   APP_HOST: Joi.string().default('localhost'),
   NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),

   // Database Configuration
   DB_HOST: Joi.string().default('localhost'),
   DB_PORT: Joi.number().default(27017),
   DB_USERNAME: Joi.string().allow('', null).default(''),
   DB_PASSWORD: Joi.string().allow('', null).default(''),
   DB_NAME: Joi.string().default('WS-Workspace-Service'),

   // Kafka Configuration
   KAFKA_BROKER: Joi.string().required(),
   KAFKA_CLIENT_ID: Joi.string().default('workspace-service'),
   KAFKA_GROUP_ID: Joi.string().default('workspace-group'),
   
   // Service Configuration
   API_GATEWAY_URL: Joi.string().uri().required(),
}); 