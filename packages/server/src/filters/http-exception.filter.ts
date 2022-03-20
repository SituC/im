// 请求过滤器
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ApiException } from '../exception/api.exception';
import { LoggerService } from '../logs/index'
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // constructor (
  //   private readonly logger?: LoggerService,
  // ) {}
  logger = new LoggerService()
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    if (exception instanceof ApiException) {
      response
        .status(status)
        .json({
          code: exception.getErrorCode(),
          message: exception.getErrorMessage(),
          date: new Date().toLocaleDateString(),
          // path: request.url,
        });
    } else {
      // console.log('系统捕获错误', status, JSON.stringify(exception));
      this.logger.error(`系统捕获错误' - ${status} - ${JSON.stringify(exception)}`)
      response
      .status(status)
      .json({
        statusCode: status,
        message: exception.response.error,
        date: new Date().toLocaleDateString(),
        // path: request.url,
      });
    }
  }
}
