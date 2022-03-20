import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import conifg from '../../config/config';
import { LoggerService } from '../../logs/index'
@Injectable()
export class AuthService {
  constructor(
    // 注入UsersService，所以需要import UsersModule
    // 底下的provider才能被注入
    private readonly jwtService: JwtService,
    private userService: UserService,
    private logger: LoggerService
  ) {}
  async createToken(username: string) {
    // console.log('生成token操作2===>', account);
    const user = { username };
    const expiration = conifg.tokenMaxAge; // 单位为s
    // 将使用者资讯加密
    // console.log('user', user);
    const accessToken = this.jwtService.sign(user, {
        // 关于建立token时相关参数
        // 过期时间
        expiresIn: expiration,
        // algorithm:'RS256', // default是HMAC SHA256，也可以指定別的
    });
    
    return {
      expiration,
      accessToken,
    };

  }
  async validateUser(username: string) {
    // jwt decoded后会得到上面的user object
    this.logger.info(`username - ${username}`)
    return await this.userService.findOne(username);
  }
}
