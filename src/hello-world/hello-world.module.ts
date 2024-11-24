import { HelloWorldResolver } from './hello-world.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [HelloWorldResolver],
})
export class HelloWorldModule {}
