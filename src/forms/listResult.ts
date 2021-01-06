import { ApiProperty } from "@nestjs/swagger"
import { ObjectLiteral } from "typeorm"

export class ListResult{
  @ApiProperty({type: 'array', items: {type: 'object'}})
  data: any[]

  @ApiProperty()
  total: number
}