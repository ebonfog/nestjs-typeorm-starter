import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as Joi from 'joi'
import { CommonEntity } from "src/lib/common.entity";

@Entity()
export class User extends CommonEntity{

  @ApiProperty()
  @Column({unique: true})
  email?: string

  @ApiProperty()
  @Column({select: false})
  password?: string

}

export class UserSchema {
  private static data = {
    email: Joi.string().email(),
    password: Joi.string().min(8),
  }

  static create = Joi.object({
    email: UserSchema.data.email.required(),
    password: UserSchema.data.password.required(),
  })

  static resetPassword = Joi.object({ password: UserSchema.data.password.required() })
  
  static updatePassword = Joi.object({
    oldPassword: UserSchema.data.password.required(),
    newPassword: UserSchema.data.password.required(),
  })

  static login = Joi.object({
    email: UserSchema.data.email,
    password: Joi.string(),
  })
}