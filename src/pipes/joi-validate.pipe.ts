import { ArraySchema, ObjectSchema } from 'joi';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {

  constructor(private schema: ObjectSchema | ArraySchema ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { value: data, error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }
}