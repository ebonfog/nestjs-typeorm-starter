import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { jwtConstants } from './constants';

export interface JwtPayload {
  userId: string,
  email: string
}

export interface JwtAuthResult {
  user: JwtPayload
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<JwtPayload> {
    return { userId: payload.userId, email: payload.email };
  }
}
