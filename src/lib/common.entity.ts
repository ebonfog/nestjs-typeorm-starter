import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CommonEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string
  
  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt?: Date

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt?: Date
}