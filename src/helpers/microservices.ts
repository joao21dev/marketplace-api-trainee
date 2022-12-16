import { env } from './environment';
import { INestApplication } from '@nestjs/common';
import { timeout } from 'rxjs';
import {
  ClientKafka,
  ClientProviderOptions,
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

export class Microservices {
  private client: ClientProxy;

  constructor() {
    this.connectToClient();
  }

  connectToClient(): void {
    const settings = Microservices.buildSettings();
    this.client = ClientProxyFactory.create(settings);
  }

  emitEvent(client: ClientKafka, topic: string, data: any) {
    return client.emit(topic, data);
  }

  async sendEvent(topic: string, data: any, timeoutValue = 5000) {
    try {
      const response = await this.client
        .send(topic, data)
        .pipe(timeout(timeoutValue))
        .toPromise();
      return response;
    } catch (error) {
      console.error(`Error on sending event to topic ${topic}`, error);
      return null;
    }
  }

  static buildSettings(optionalName?: string): ClientProviderOptions {
    return {
      name: optionalName,
      transport: Transport.REDIS,
      options: {
        url: env.microserviceUrl,
      },
    };
  }

  static async connectTo(app: INestApplication): Promise<void> {
    if (env.isMicroservice) {
      const settings = this.buildSettings();
      app.connectMicroservice(settings);

      await app.startAllMicroservices();
    }
  }
}
