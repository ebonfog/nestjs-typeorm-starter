import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/lib/common.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService extends CommonService<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
    private jwtService: JwtService
  ){super(repository)}

  private hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
  }

  private comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash)
  }

  private generateToken(user: User): string {
    return this.jwtService.sign({
      userId: user.id,
      email: user.email
    })
  } 

  async create(data: User): Promise<User> {
    const accountData = {
      email: data.email,
      password: this.hashPassword(data.password),
    }
    const {password, ...response}: User = await super.create(accountData)
    return response
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.findOne({
      select: ['id', 'email', 'password']
    })
    if (user && this.comparePassword(pass, user.password)) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(credential: { email: string; password: string }): Promise<{token: string}> {
    const { email, password } = credential
    const user = await this.validateUser(email, password)
    if (!user) throw new UnauthorizedException()
    const token = this.generateToken(user)
    return { token }
  }
}
