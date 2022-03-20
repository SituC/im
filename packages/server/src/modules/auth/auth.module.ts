import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PublicModule } from '../public/public.module';
import { AuthController } from './auth.controller';
import { DefaultJwtStrategy } from '../../bearer/defaultJwt.strategy';

@Module({
  imports: [
    PublicModule,
  ],
  providers: [
    AuthService,
    DefaultJwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
