import { Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ListResult } from 'src/forms/listResult';
import { SampleService } from './sample.service';

@ApiTags('Sample')
@Controller('sample')
export class SampleController {
  constructor(
    private readonly service: SampleService
  ){}

  @Get()
  @ApiCreatedResponse({type: ListResult})
  async listSample() {
    return
  }
}
