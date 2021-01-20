import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeormFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const detail: string = JSON.parse(JSON.stringify(exception)).detail
    const message = detail.includes('already exists') ?
      detail.split(/[()]/)[1].replace(/"/g, '') + ' already exist' : exception.message
    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message,
    })
  }
}

