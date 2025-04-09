import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
   constructor(configService: ConfigService) {
      const secretKey = configService.get<string>('auth.accessTokenSecret');
      if (!secretKey) {
         throw new Error('ACCESS_TOKEN_SECRET is not defined');
      }
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: secretKey,
      });
   }

   async validate(payload: any) {
      return { IDUser: payload.sub, username: payload.username };
   }
}