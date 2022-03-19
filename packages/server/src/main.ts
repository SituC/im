import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggerService } from './logs/index'
import config from './config/config'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(config.port, () => {
    // console.log('im服务已启动，服务器端口http://localhost:8080，客户端请访问http://localhost:3000')
    new LoggerService().info(`im服务已启动，服务器端口http://localhost:${config.port}，客户端请访问http://localhost:3000`)
  });
}
bootstrap();
