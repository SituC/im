import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../modules/auth/auth.service';
import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ApiException } from '../exception/api.exception';
import { LoggerService } from '../logs/index'
import { ApiErrorCode } from '../enums/api-error-code.enum';
import config from '../config/config';
@Injectable()
export class DefaultJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {
    super({
      // 要从header取得bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 这里的key就是要跟create token时的key一样
      secretOrKey: 'im',
      issuer: config.issuer,
    });
  }

  // Passport会自动verify jwt，如果key不正确，或是相关信息
  // 不正确，如issuer不正确则直接回返回401错误
  async validate(payload) {
    this.logger.success(`权限验证通过 - ${JSON.stringify(payload)}`)
    const { username } = payload;
    const user = await this.authService.validateUser(username);
    if (!user) {
      throw new ApiException('未找到用户', ApiErrorCode.ERROR_TOAST, HttpStatus.OK);
    }
    return user;
  }

}
