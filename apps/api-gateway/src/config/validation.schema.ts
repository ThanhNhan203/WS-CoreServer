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

   // JWT Configuration
   JWT_SECRET: Joi.string().required(),
   JWT_EXPIRES_IN: Joi.string().default('15d'),
   ACCESS_TOKEN_SECRET: Joi.string().required(),
   ACCESS_TOKEN_EXPIRES_IN: Joi.string().default('15m'),
   REFRESH_TOKEN_SECRET: Joi.string().required(),
   REFRESH_TOKEN_EXPIRES_IN: Joi.string().default('30d'),

   // GitHub Configuration
   GITHUB_CLIENT_ID: Joi.string().allow('', null).default(''),
   GITHUB_CLIENT_SECRET: Joi.string().allow('', null).default(''),
   GITHUB_CALLBACK_URL: Joi.string()
      .uri()
      .allow('', null)
      .default('http://localhost:3000/auth/github/callback'),
});
