import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as Joi from 'joi'
import { CommonEntity } from "src/lib/common.entity";

@Entity()
export class User extends CommonEntity{
  private static schema = {
    email: Joi.string().email(),
    password: Joi.string().min(8),
  }

  static validate = {
    create: Joi.object({
      email: User.schema.email.required(),
      password: User.schema.password.required(),
    }),
    resetPassword: Joi.object({ password: User.schema.password.required() }),
    updatePassword: Joi.object({
      oldPassword: User.schema.password.required(),
      newPassword: User.schema.password.required(),
    }),
    login: Joi.object({
      email: User.schema.email,
      password: Joi.string(),
    })
  }

  @ApiProperty()
  @Column({unique: true})
  email?: string

  @ApiProperty()
  @Column({select: false})
  password?: string

}