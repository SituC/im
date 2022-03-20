import { Module } from '@nestjs/common';
import { TypeOrmModule as TypeOrmDiyModule, TypeOrmLoggerService } from './logs/typeOrmLogger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entity/user.entity';
import { Group, GroupMap } from './modules/group/entity/group.entity';
import { GroupMessage } from './modules/group/entity/groupMessage.entity';
import { ApiModule } from './modules/index.module';
import { PublicModule } from './modules/public/public.module';
import { EnvModule } from './env/env';
import { AuthModule } from './modules/auth/auth.module'
import { ChatGateway } from './modules/chat/chat.gateway'
// import { AccessTokenModule } from './accessToken/accessToken.module'
@Module({
  imports: [
    EnvModule,
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmDiyModule],
      inject: [TypeOrmLoggerService],
      useFactory: async () => {
        return {
          type: 'mysql',
          host: process.env.HOST,
          port: Number(process.env.PORT),
          username: process.env.USERNAME,
          password: process.env.PASSWORD,
          database: process.env.DATABASE,
          entities: [User, Group, GroupMap, GroupMessage],
          synchronize: true,
        };
      },
    }),
    AuthModule,
    ApiModule,
    PublicModule,
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
