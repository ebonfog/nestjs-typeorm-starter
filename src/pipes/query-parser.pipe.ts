import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RequestQuery } from 'src/forms/requestQuery';
import { Between, MoreThanOrEqual, MoreThan, LessThanOrEqual, LessThan, Not, In, Any } from 'typeorm';

@Injectable()
export class QueryParserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.where) value.where = this.parseWhere(value.where)
    if (value.order) value.order = JSON.parse(value.order)
    return value;
  }

  parseWhere = (whereStr: string) => {
    const where = JSON.parse(whereStr, (key, value) => {
      if (typeof value !== 'object') return value
      if (Array.isArray(value)) return value
  
      if(value.hasOwnProperty('between'))
        return Between(value.between[0], value.between[1])
      if(value.hasOwnProperty('gte')) return MoreThanOrEqual(value.gte)
      if(value.hasOwnProperty('gt')) return MoreThan(value.gt)
      if(value.hasOwnProperty('lte')) return LessThanOrEqual(value.lte)
      if(value.hasOwnProperty('lt')) return LessThan(value.lt)
      if(value.hasOwnProperty('neq')) return Not(value.neq)
      if(value.hasOwnProperty('in')) return In(value.in)
      if(value.hasOwnProperty('any')) return Any(value.any)
      return value
    })
    return where
  }
}
