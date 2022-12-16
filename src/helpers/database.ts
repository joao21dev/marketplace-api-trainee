import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { env } from './environment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export class Database {
  static buildSettings(): DataSourceOptions {
    return {
      name: env.appId,
      type: 'mysql',
      host: env.dbHost,
      port: env.dbPort,
      username: env.dbUser,
      password: env.dbPassword,
      database: env.dbName,
      entities: ['dist/src/entities/*{.ts,.js}'],
      migrations: ['dist/migrations/*.js'],
      synchronize: false,
      timezone: 'Z',
    };
  }

  static async build() {
    return TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.dbHost,
      port: env.dbPort,
      username: env.dbUser,
      password: env.dbPassword,
      database: env.dbName,
      autoLoadEntities: true,
      synchronize: false,
      timezone: 'Z',
    });
  }

  static registerEntities(entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}

export const dataSource: DataSource = new DataSource(Database.buildSettings());
