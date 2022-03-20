import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggerService } from './logs/index'
import config from './config/config'
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { WsAdapter } from './ws/ws.adapter';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 使用全局接口异常过滤去
  app.useGlobalFilters(new HttpExceptionFilter());
  // 使用全局拦截器拦截正常的接口请求返回数据
  app.useGlobalInterceptors(new ApiInterceptor());
  // 配置 cookie 中间件
  app.use(cookieParser('im'));
  // 配置 session 的中间件
  app.use(session({
    secret: 'im',
    resave: false,
    saveUninitialized: true,
    // cookie: secure:true 这里的secure改为false，这样在http协议下面也能生效，true则需要https协议
    // httpOnly: true 仅允许网络访问，不允许js访问
    cookie: { maxAge: 1000 * 60 * 30, httpOnly: true, secure: false },
    rolling: true,
  }));
  // 配置白名单
  app.enableCors({
    origin: config.whiteUrl,
    credentials: true, // 允许跨域携带cookie
  });
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(config.port, () => {
    // console.log('im服务已启动，服务器端口http://localhost:8080，客户端请访问http://localhost:3000')
    new LoggerService().info(`im服务已启动，服务器端口http://localhost:${config.port}，客户端请访问http://localhost:3000`)
  });
}
bootstrap();
