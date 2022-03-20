import { Module } from '@nestjs/common';
import { PublicModule } from './public/public.module';
import { UserController } from './user/user.controller';
import { GroupController } from './group/group.controller';
import { EnvModule } from '../env/env';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    EnvModule,
    PublicModule,
  ],
  controllers: [AuthController, UserController, GroupController],
})
export class ApiModule {}
