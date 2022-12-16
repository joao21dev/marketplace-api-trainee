import { env } from './environment';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class Swagger {
  static async initOn(app: INestApplication): Promise<void> {
    if (env.hasSwagger) {
      const settings = new DocumentBuilder()
        .setTitle(env.appName)
        .setDescription(env.appDescription)
        .addBearerAuth()
        .setVersion(env.appVersion)
        .build();

      const document = SwaggerModule.createDocument(app, settings);
      const swaggerRoute = env.swagerRoute || 'docs';

      SwaggerModule.setup(swaggerRoute, app, document, {
        swaggerOptions: { defaultModelsExpandDepth: 0 },
      });
    }
  }
}
