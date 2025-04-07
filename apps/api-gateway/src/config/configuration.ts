export interface AppConfig {
   port: number;
   env: string;
   host: string;
   clientCors: string;
}

export interface DatabaseConfig {
   uri: string;
   host: string;
   port: number;
   username: string;
   password: string;
   name: string;
}

export interface AuthConfig {
   jwtSecret: string;
   jwtExpiresIn: string;
   accessTokenSecret: string;
   accessTokenExpiresIn: string;
   refreshTokenSecret: string;
   refreshTokenExpiresIn: string;
}

export interface GithubConfig {
   clientId: string;
   clientSecret: string;
   callbackUrl: string;
}

export default () => {
   const dbUsername = process.env.DB_USERNAME || '';
   const dbPassword = process.env.DB_PASSWORD || '';
   const dbHost = process.env.DB_HOST || 'localhost';
   const dbPort = parseInt(process.env.DB_PORT ?? '27017', 10);
   const dbName = process.env.DB_NAME || 'WSS-API-Gateway';

   const dbUri = `mongodb://${dbUsername ? `${dbUsername}:${dbPassword}@` : ''}${dbHost}:${dbPort}/${dbName}`;

   return {
      app: {
         port: parseInt(process.env.PORT ?? '3000', 10),
         env: process.env.NODE_ENV || 'development',
         host: process.env.APP_HOST || 'localhost',
         clientCors: process.env.CLIENT_CORS || 'http://localhost',
      } as AppConfig,

      database: {
         uri: dbUri,
         host: dbHost,
         port: dbPort,
         username: dbUsername,
         password: dbPassword,
         name: dbName,
      } as DatabaseConfig,

      auth: {
         jwtSecret: process.env.JWT_SECRET || 'default-jwt-secret',
         jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
         accessTokenSecret:
            process.env.ACCESS_TOKEN_SECRET || 'default-access-secret',
         accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
         refreshTokenSecret:
            process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret',
         refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
      } as AuthConfig,

      github: {
         clientId: process.env.GITHUB_CLIENT_ID || '',
         clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
         callbackUrl:
            process.env.GITHUB_CALLBACK_URL ||
            'http://localhost:3000/auth/github/callback',
      } as GithubConfig,
   };
};
