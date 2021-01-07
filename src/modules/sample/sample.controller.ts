import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'src/forms/deleteResult';
import { ListResult } from 'src/forms/listResult';
import { RequestQuery } from 'src/forms/requestQuery';
import { JoiValidationPipe } from 'src/pipes/joi-validate.pipe';
import { QueryParserPipe } from 'src/pipes/query-parser.pipe';
import { Sample } from './sample.entity';
import { SampleService } from './sample.service';

@ApiTags('Sample')
@Controller('sample')
export class SampleController {
  constructor(
    private readonly service: SampleService
  ){}

  @Get()
  @ApiCreatedResponse({type: ListResult})
  @ApiQuery({type: RequestQuery, required: false})
  async listSample(@Query(new QueryParserPipe()) query) {
    console.log(query)
    return this.service.find()
  }

  @Post()
  @ApiCreatedResponse({type: Sample})
  async createSample(@Body(new JoiValidationPipe(Sample.validate.create)) data: Sample) {
    return this.service.create(data)
  }

  @Get(':id')
  @ApiCreatedResponse({type: Sample})
  @ApiParam({name: 'id'})
  async getSample(@Param('id') id: string) {
    return this.service.findById(id)
  }

  @Patch(':id')
  @ApiCreatedResponse({type: Sample})
  @ApiParam({name: 'id'})
  async updateSample(@Param('id') id: string, @Body(new JoiValidationPipe(Sample.validate.update)) data: Sample) {
    return this.service.update(id, data)
  }

  @Delete(':id')
  @ApiCreatedResponse({type: DeleteResult})
  @ApiParam({name: 'id'})
  async deleteSample(@Param('id') id: string) {
    return this.service.delete(id)
  }
}
