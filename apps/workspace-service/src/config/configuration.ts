export interface AppConfig {
   port: number;
   env: string;
   host: string;
}

export interface DatabaseConfig {
   uri: string;
   host: string;
   port: number;
   username: string;
   password: string;
   name: string;
}

export interface KafkaConfig {
   broker: string;
   clientId: string;
   groupId: string;
}

export interface ServiceConfig {
   apiGatewayUrl: string;
}

export default () => {
   const dbUsername = process.env.DB_USERNAME || '';
   const dbPassword = process.env.DB_PASSWORD || '';
   const dbHost = process.env.DB_HOST || 'localhost';
   const dbPort = parseInt(process.env.DB_PORT ?? '27017', 10);
   const dbName = process.env.DB_NAME || 'WS-Workspace-Service';

   const dbUri = `mongodb://${dbUsername ? `${dbUsername}:${dbPassword}@` : ''}${dbHost}:${dbPort}/${dbName}`;

   return {
      app: {
         port: parseInt(process.env.PORT ?? '3002', 10),
         env: process.env.NODE_ENV || 'development',
         host: process.env.APP_HOST || 'localhost',
      } as AppConfig,

      database: {
         uri: dbUri,
         host: dbHost,
         port: dbPort,
         username: dbUsername,
         password: dbPassword,
         name: dbName,
      } as DatabaseConfig,

      kafka: {
         broker: process.env.KAFKA_BROKER || 'localhost:9092',
         clientId: process.env.KAFKA_CLIENT_ID || 'workspace-service',
         groupId: process.env.KAFKA_GROUP_ID || 'workspace-group',
      } as KafkaConfig,

      service: {
         apiGatewayUrl: process.env.API_GATEWAY_URL || 'http://localhost:3000',
      } as ServiceConfig,
   };
}; 