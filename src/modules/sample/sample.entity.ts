import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as Joi from 'joi'
import { CommonEntity } from "src/lib/common.entity";

export enum SampleEnum {
  'A' = 'a',
  'B' = 'b',
  'C' = 'c'
}

@Entity()
export class Sample extends CommonEntity{
  @ApiProperty()
  @Column({unique: true})
  name?: string

  @ApiProperty()
  @Column({nullable: true})
  value?: number

  @ApiProperty({enum: SampleEnum})
  @Column({enum: SampleEnum})
  enumValue?: SampleEnum
}

export class SampleSchema {
  private static data = {
    name: Joi.string(),
    value: Joi.number().allow(null),
  }
  static create = Joi.object({
      ...SampleSchema.data,
      name: SampleSchema.data.name.required()
    })
  static update = Joi.object(SampleSchema.data)

}
