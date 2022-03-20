// 自定义请求状态码
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '../enums/api-error-code.enum';
import { LoggerService } from '../logs/index'
export class ApiException extends HttpException {

  private errorMessage: string;
  private errorCode: ApiErrorCode;
  logger = new LoggerService()
  constructor(errorMessage: string, errorCode: ApiErrorCode, statusCode: HttpStatus) {

    super(errorMessage, statusCode);
    this.logger.error(`捕获错误 - ${errorMessage} - ${errorCode}`);
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  getErrorCode(): ApiErrorCode {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
