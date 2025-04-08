import * as Joi from 'joi';

export const jwtValidationSchema = {
   JWT_SECRET: Joi.string().required(),
   JWT_EXPIRES_IN: Joi.string().default('15d'),
   ACCESS_TOKEN_SECRET: Joi.string().required(),
   ACCESS_TOKEN_EXPIRES_IN: Joi.string().default('15m'),
   REFRESH_TOKEN_SECRET: Joi.string().required(),
   REFRESH_TOKEN_EXPIRES_IN: Joi.string().default('30d'),
}; 