import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as Joi from 'joi'

@Entity()
export class User {
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

  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @ApiProperty()
  @Column({unique: true})
  email?: string

  @ApiProperty()
  @Column({select: false})
  password?: string

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date
}