import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Sample } from './modules/sample/sample.entity';
import { SampleModule } from './modules/sample/sample.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL || 'postgres://guroo:Guroo1q2w3e4r@128.199.64.216:5432/wiztech',
      synchronize: true,
      entities: [Sample]
    }),
    SampleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
