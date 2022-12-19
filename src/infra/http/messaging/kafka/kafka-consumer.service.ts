import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices"
import { isConstructorDeclaration } from "typescript";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {

  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['real-buck-14260-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: 'cmVhbC1idWNrLTE0MjYwJN-1CuhNcSBg9GxNC7lzJwj2rkBzmLkap5F_0pLefDM',
          password: 'mm9XhM6VDo4D1NonbkiQciDtsdlIsqJ5Cp8mp-BxHaqhGTlO07RkALy2blKBAqHjJa_yOQ==',
        },
        ssl: true,
      }
    });
  }
  async onModuleDestroy() {
    await this.close();
  }

}