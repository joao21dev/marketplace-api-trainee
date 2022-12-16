import * as dotenv from 'dotenv';

export class BaseEnv {
  appEnv: string;
  appId: string;
  appName: string;
  appDescription: string;
  appVersion: string;
  appKey: string;
  appPrefix: string;
  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  microserviceUrl: string;
  isMicroservice: boolean;
  hasSwagger: boolean;
  swagerRoute: string;
  sentryDns: string;
  sentryTracesSampleRate: number;
  jwtExpiration: string;
  api123Url: string;
  secret_key: string;

  constructor() {
    dotenv.config();
    this.setBaseEnvVariables();
  }

  get isTest(): boolean {
    return process.env.JEST_WORKER_ID !== undefined;
  }

  setBaseEnvVariables(): void {
    this.appId = process.env.APP_ID;
    this.appEnv = process.env.APP_ENV;
    this.appName = process.env.APP_NAME;
    this.appDescription = process.env.APP_DESCRIPTION;
    this.appVersion = process.env.APP_VERSION;
    this.appKey =
      process.env.APP_KEY ?? 'mVCiFp08JZ7B0EpimVCiFp08JZ7B0EpimVCiFpKa13a';
    this.appPrefix = process.env.APP_PREFIX;
    this.dbHost = process.env.DB_HOST;
    this.dbPort = parseInt(process.env.DB_PORT);
    this.dbUser = process.env.DB_USERNAME;
    this.dbPassword = process.env.DB_PASSWORD;
    this.dbName = process.env.DB_DATABASE;
    this.microserviceUrl = process.env.MICROSERVICE_URL;
    this.isMicroservice = process.env.IS_SERVICE === '1';
    this.hasSwagger = process.env.HAS_SWAGGER === '1';
    this.swagerRoute = process.env.SWAGGER_ROUTE;
    this.sentryDns = process.env.SENTRY_DSN;
    this.sentryTracesSampleRate = parseInt(
      process.env.SENTRY_TRACES_SAMPLE_RATE,
    );
    this.jwtExpiration = process.env.JWT_EXPIRATION ?? '60m';
    this.api123Url = process.env.API_123_URL;
    this.secret_key = process.env.JWT_SECRET;
  }

  isProduction(): boolean {
    return this.appEnv === 'production';
  }
}

export const env = new BaseEnv();
