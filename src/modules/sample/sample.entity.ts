import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as Joi from 'joi'
import { CommonEntity } from "src/lib/common.entity";

@Entity()
export class Sample extends CommonEntity{
  private static schema = {
    name: Joi.string(),
    value: Joi.number().allow(null),
  }
  static validate = {
    create: Joi.object({
      ...Sample.schema,
      name: Sample.schema.name.required()
    }),
    update: Joi.object(Sample.schema)
  }

  @ApiProperty()
  @Column({unique: true})
  name?: string

  @ApiProperty()
  @Column({nullable: true})
  value?: number
}
