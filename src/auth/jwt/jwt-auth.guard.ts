import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private roles: string[] | undefined
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    // this.roles = this.reflector.get<string[]>('roles', context.getHandler());
    return super.canActivate(context);
  }
  
  handleRequest(err, user, info: Error) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    // if (this.roles && !this.roles.includes(user.role)) throw new UnauthorizedException()
    return user;
  }
}
