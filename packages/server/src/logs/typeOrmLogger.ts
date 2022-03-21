
import { LoggerModule } from './index';
import { Logger, QueryRunner } from 'typeorm';
import { Injectable, Module } from '@nestjs/common';
import { LoggerService } from './index';
@Injectable()
export class TypeOrmLoggerService implements Logger {
  constructor(
    private readonly logger: LoggerService,
  ) {}
  /**
   * 查询参数配置
   */
  public logQuery(
    query: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parameters?: any[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryRunner?: QueryRunner,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any {
    this.logger.info(`typeorm:query ${query}`, parameters || []);
  }

  /**
   * 查询出错时
   */
  public logQueryError(
    error: string,
    query: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parameters?: any[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryRunner?: QueryRunner,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any {
    this.logger.error(`typeorm:query ${error}`, {
      query,
      parameters: parameters || [],
    });
  }

  /**
   * 查询记录速度慢时
   */
  public logQuerySlow(
    time: number,
    query: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parameters?: any[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryRunner?: QueryRunner,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any {
    this.logger.warn(`typeorm:query slow +${time}`, {
      query,
      parameters,
    });
  }

  /**
   * schema 创建时
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
  public logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    this.logger.info(`typeorm:schema ${message}`);
  }

  /**
   * 打印迁移运行过程中的事件。
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
  public logMigration(message: string, queryRunner?: QueryRunner): any {
    this.logger.info(`typeorm:migration ${message}`);
  }

  public log(
    level: 'log' | 'info' | 'warn',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryRunner?: QueryRunner,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any {
    switch (level) {
      case 'log':
        this.logger.success(message);
        break;
      case 'info':
        this.logger.info(message);
        break;
      case 'warn':
        this.logger.warn(message);
        break;
    }
  }
}

// tslint:disable-next-line: max-classes-per-file
@Module({
  imports: [LoggerModule],
  providers: [TypeOrmLoggerService, LoggerService],
  exports: [TypeOrmLoggerService, LoggerService],
})

export class TypeOrmModule {}
