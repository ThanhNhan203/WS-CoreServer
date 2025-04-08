import * as Joi from 'joi';

export const githubValidationSchema = {
   GITHUB_CLIENT_ID: Joi.string().allow('', null).default(''),
   GITHUB_CLIENT_SECRET: Joi.string().allow('', null).default(''),
   GITHUB_CALLBACK_URL: Joi.string()
      .uri()
      .allow('', null)
      .default('http://localhost:3000/auth/github/callback'),
}; 