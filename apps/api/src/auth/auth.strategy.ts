import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ifemoney'
    });
  }

  async validate(payload: { email: string }) {
    console.log(payload, "Inside JWT strategy")
    return await this.authService.validateUser(payload);
  }
}
