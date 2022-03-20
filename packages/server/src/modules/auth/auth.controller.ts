import { Controller, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 传入name和password和code取得jwt token
  async getTokenByUserName(@Body('username') username: string) {
    console.log('生成token操作1===>', username);
    return await this.authService.createToken(username);
  }
}
