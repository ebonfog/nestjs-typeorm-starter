import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './sample.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  providers: [SampleService],
  controllers: [SampleController]
})
export class SampleModule {}
