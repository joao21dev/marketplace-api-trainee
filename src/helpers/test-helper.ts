import * as request from 'supertest';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ModuleMetadata, ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import {
  DataSource,
  createConnection,
  getConnection,
  getRepository,
  Repository,
  EntityTarget,
} from 'typeorm';

export class TestHelper {
  public testName: string;
  public testMetadata: ModuleMetadata;
  public app: INestApplication;
  public testingModule: TestingModule;
  public testingModuleBuilder: TestingModuleBuilder;
  public testingDatabase: DataSource;

  constructor(testName: string, metadata: ModuleMetadata = {}) {
    this.testName = testName;
    this.testMetadata = metadata;
  }

  async build(
    entities: EntityClassOrSchema[] = [],
  ): Promise<TestingModuleBuilder> {
    this.testingModuleBuilder = Test.createTestingModule(this.testMetadata);

    if (entities.length > 0) {
      await this.setDatabaseEntities(entities);
    }

    return this.testingModuleBuilder;
  }

  async compile(): Promise<TestingModule> {
    return await this.testingModuleBuilder.compile();
  }

  async init(): Promise<INestApplication> {
    this.testingModule = await this.compile();

    this.app = this.testingModule.createNestApplication();
    this.app.useGlobalPipes(new ValidationPipe());

    await this.app.init();

    return this.app;
  }

  async setDatabaseEntities(
    entities: EntityClassOrSchema[],
  ): Promise<DataSource> {
    this.testingDatabase = await createConnection({
      name: this.testName,
      type: 'sqlite',
      database: ':memory:',
      entities: entities,
      migrations: ['dist/migrations/*.js'],
      synchronize: true,
    });

    return this.testingDatabase;
  }

  getRepository(entity: EntityTarget<any>): Repository<any> {
    return getRepository(entity, this.testName);
  }

  async close(): Promise<void> {
    if (this.app) {
      await this.app.close();
    }

    if (this.testingDatabase) {
      await getConnection(this.testName).close();
    }
  }

  get request(): request.SuperTest<request.Test> {
    return request(this.app.getHttpServer());
  }
}
