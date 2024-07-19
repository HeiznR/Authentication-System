import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../jwtPayload';
import { Inject } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(ConfigService) protected configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }
  async validate(payload: JwtPayload) {
    //here can be some additional actions to db, to get more information about user, and return it
    return payload;
  }
}
