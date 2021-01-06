import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sample {
  static schema = {}
  
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column()
  name?: string

  @ApiProperty()
  @Column()
  value?: number
}
