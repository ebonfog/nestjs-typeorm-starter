import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, FindOneOptions, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class CommonService<Entity extends ObjectLiteral> {
  constructor(
    protected repository: Repository<Entity>
  ){}

  async find(options: FindManyOptions<Entity> = {}): Promise<{data: Entity[], total: number}> {
    const [data, total] = await this.repository.findAndCount(options)
    return {data, total}
  }

  async findById(id: string, options: FindOneOptions = {}): Promise<Entity> {
    return this.repository.findOneOrFail(id, options)
      .catch(err => {
        throw new NotFoundException(err.message)
      })
  }

  async findOne(options: FindOneOptions | FindConditions<Entity> = {}): Promise<Entity | undefined> {
    return this.repository.findOne(options)
  }

  async create(data: Entity): Promise<Entity> {
    const newEvent: Entity = await this.repository.create(data)
    return this.repository.save(newEvent)
  }

  async update(id: string, data: Entity): Promise<Entity> {
    const instance = await this.findById(id)
    return this.repository.save({...instance, ...data})
  }
  
  async delete(id: string): Promise<{affected: number}> {
    const result = await this.repository.delete(id)
    return {affected: result.affected}
  }
}
