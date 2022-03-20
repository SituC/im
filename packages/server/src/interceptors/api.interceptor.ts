/*
* 接口请求成功拦截器
*/
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { LoggerService } from '../logs/index'
import { Observable } from 'rxjs';
interface Response<T> {
  data: T;
}

@Injectable()
export class ApiInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    // console.log(context.getArgByIndex(0).body)
    new LoggerService().info(`请求参数 - ${JSON.stringify(context.getArgByIndex(0).body)}`)
    return next.handle().pipe(
      map(data => {
        return {
          data,
          code: 0,
          message: '请求成功',
        };
      }),
    );
  }
}
