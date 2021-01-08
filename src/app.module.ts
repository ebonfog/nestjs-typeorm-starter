import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Sample } from './modules/sample/sample.entity';
import { SampleModule } from './modules/sample/sample.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DB_URL'),
        synchronize: true,
        entities: [Sample]
      })
    }),
    SampleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
