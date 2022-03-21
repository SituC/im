import { Inject, Injectable, Module } from "@nestjs/common";
import { lightBlue, lightGreen, lightRed, lightYellow } from 'kolorist'
import { formatDate } from '../utils/index'
import path = require('path');
@Injectable()
export class LoggerService {
  public logger;
  public PREFIX = formatDate(Date.now())
  public success(message: string, ...args: any[]): void {
    console.log(lightGreen(`✔ ${this.PREFIX} - ${message}`))
  }

  public info(message: string, ...args: any[]): void {
    console.log(lightBlue(`✈ ${this.PREFIX} - ${message}`))
  }

  public warn(message: string, ...args: any[]): void {
    console.log(lightYellow(`▶ ${this.PREFIX} - ${message}`))
  }

  public error(message: string, ...args: any[]): void {
    console.log(lightRed(`✖ ${this.PREFIX} - ${message}`))
  }


}

@Module({
  imports: [],
  providers: [LoggerService],
  exports: [LoggerService],
})

export class LoggerModule {}
