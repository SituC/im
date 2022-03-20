import { Module } from '@nestjs/common';
import config from '../../config/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// 数据库实体
import { User } from '../user/entity/user.entity';
import { Group, GroupMap } from '../group/entity/group.entity';
import { GroupMessage} from '../group/entity/groupMessage.entity';

import { LoggerService } from '../../logs/index';
import { TypeOrmLoggerService } from '../../logs/typeOrmLogger';
// 注意： jwtmodule需要exports导出，才能在authModule里面使用JwtService
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service'
import { UserService } from '../user/user.service'
import { GroupService } from '../group/group.service'

// websocket
import { ChatGateway } from '../chat/chat.gateway'
@Module({
  imports: [
    // RedisBaseModule,
    TypeOrmModule.forFeature([User, Group, GroupMap, GroupMessage]),
    // 建立jsonwebtoken时的相关信息
    JwtModule.register({
      secret: 'im',
      // signOption可以在JwtModule设定
      // 或是在createToken时候设定
      signOptions: {
        // expiresIn: 5,
        issuer: config.issuer,
      },
    }),
    // 指定passport使用jwt验证
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  providers: [
    AuthService, LoggerService, TypeOrmLoggerService,
    UserService, GroupService, ChatGateway
  ],
  exports: [
    JwtModule,
    PassportModule,
    AuthService,
    LoggerService, TypeOrmLoggerService, UserService, GroupService, ChatGateway
  ],
  controllers: [],
})
export class PublicModule {}
