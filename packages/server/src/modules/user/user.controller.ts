import { Controller, Post, Get, Request, Response, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoggerService } from '../../logs/index';
import { ApiException } from '../../exception/api.exception';
import { ApiErrorCode } from '../../enums/api-error-code.enum';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private logger: LoggerService,
    private auth: AuthService,
    // private logger = new Logger()
  ) {}

  /**
   * 注册
   * @param {object} body - User对象
   * @param {string} body.username - 昵称
   * @param {string} body.password - 密码
   * @param req - http请求实例
   */
  @Post('register')
  async addUser(@Body() body, @Request() req) {
    const { username, password } = body;
    // console.log('cookie', req.session);
    // this.logger.success('请求参数:' + JSON.stringify(body));
    try {
      // 查重
      // const findResult = await this.userService.checkOne(username);
      // if (findResult === undefined) {
      const result = await this.userService.add({ username, password });
      this.logger.info(`user add - ${JSON.stringify(result)}`);
      // 设置token
      const token = await this.auth.createToken(username);
      if (result?.id && token.accessToken) {
        // redis 缓存
        // this.redis.set({ key: 'user', value: result });
        return {
          msg: '注册成功',
          token: token.accessToken,
        };
      }
    } catch (error) {
      // 统一返回异常
      throw new ApiException(error.message, error.errorCode, error.status);
    }
  }

  /**
   * 登录
   * @param {object} body - User对象
   * @param {string} body.username - 用户昵称
   * @param {string} body.password - 密码
   * @param req - http请求实例
   */
  @Post('login')
  async login(@Body() body, @Request() req) {
    const { username, password } = body;
    /**
     * 验证 验证码
     */
    try {
      /**
       * 查询是否有当前用户
       */
      const checkOneResult = await this.userService.checkOne(username);
      if (!checkOneResult) {
        return this.addUser(body, req) 
      } else {
        /**
         * 检测账号密码是否正确
         */
        const result = await this.userService.findOne(username, password);
        // 设置token
        const token = await this.auth.createToken(username);
        if (result !== undefined && token.accessToken) {
          // redis 缓存
          // this.redis.set({ key: 'user', value: result });
          return {
            // ...result,
            msg: '登录成功',
            token: token.accessToken,
          };
        } else {
          throw {errorCode: ApiErrorCode.ERROR_TOAST, status: HttpStatus.OK, message: '密码错误'};
        }
      }

    } catch (error) {
      // this.logger.error('user controller login error' + JSON.stringify(error));
      throw new ApiException(error.message, error.errorCode, error.status);
    }
  }

  @Post('getUser')
  @UseGuards(AuthGuard())
  async getUser(@Request() req) {
    // const user = this.auth.
    if (!req.user.id) {
      throw new ApiException('您暂未登录，请前往登录', ApiErrorCode.ERROR, HttpStatus.OK);
    }
    const user = req.user;
    user.password ? delete user.password : null;
    return user;
  }

  @Post('loginout')
  @UseGuards(AuthGuard())
  async loginOut(@Request() req, @Response() res) {
    if (!req.user.id) {
      throw new ApiException('您暂未登录，请前往登录', ApiErrorCode.ERROR, HttpStatus.OK);
    }
    res.clearCookie('connect.sid')
    res.send({
      code: 0,
      msg: '退出成功',
      data: {}
    })
  }
}
