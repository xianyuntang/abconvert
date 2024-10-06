import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import path from 'path';

import { AppConfigService } from '../app-config';
import { BACKEND_PACKAGE_TOKEN } from './backend.constant';
import { VersionsController } from './versions';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: BACKEND_PACKAGE_TOKEN,
          useFactory: (appConfigService: AppConfigService) => {
            const {
              services: {
                backend: { grpcUrl },
              },
            } = appConfigService;
            return {
              transport: Transport.GRPC,
              options: {
                package: 'backend',
                protoPath: path.resolve(__dirname, 'proto', 'backend.proto'),
                url: grpcUrl,
              },
            };
          },
          inject: [AppConfigService],
        },
      ],
    }),
  ],
  controllers: [VersionsController],
  providers: [],
})
export class BackendModule {}
