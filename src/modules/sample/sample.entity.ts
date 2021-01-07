import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as Joi from 'joi'

@Entity()
export class Sample {
  private static schema = {
    name: Joi.string(),
    value: Joi.number(),
  }
  static validate = {
    create: Joi.object({
      ...Sample.schema,
      name: Sample.schema.name.required()
    }),
    update: Joi.object(Sample.schema)
  }
  
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column({unique: true})
  name?: string

  @ApiProperty()
  @Column({nullable: true})
  value?: number
}
