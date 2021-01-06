import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/lib/common.service';
import { Repository } from 'typeorm';
import { Sample } from './sample.entity';

@Injectable()
export class SampleService extends CommonService<Sample> {
  constructor(
    @InjectRepository(Sample)
    repository: Repository<Sample>
  ) {super(repository)}
}
