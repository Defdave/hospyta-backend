import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'e2f2f6b8e92a4718b85b34eb7f9b67df02fa935ad9a8f6e1ac0c5e5b21d6b2f4',  // Use environment variables to keep your secret key safe
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.email, payload.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

