import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com,
    // then run `npx @nestjs/observe link` to write your key pair into .env.
    //ObserveModule.forRoot({
    //  appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
    //  appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
    //  serviceId: 'backend',
    ThrottlerModule.forRoot([
      {
       name : 'short-term',
       ttl: 1000,
      limit: 3,
    },

     {
       name : 'medium-term',
       ttl: 10000,
      limit: 20,
    },

     {
       name : 'long-term',
       ttl: 60000,
      limit: 100,
    }

    ]),
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
