import { InjectionToken, OptionalFactoryDependency } from '@nestjs/common';

export interface ClickhouseModuleOptions {
  database: string;
  url: string;
  username: string;
  password: string;
}

export interface ClickhouseAsyncModuleOptions {
  useFactory: (...args: never[]) => ClickhouseModuleOptions;
  inject: (InjectionToken | OptionalFactoryDependency)[] | undefined;
}
