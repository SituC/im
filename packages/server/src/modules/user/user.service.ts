import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { LoggerService } from '../../logs/index';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly logger: LoggerService,
  ) {}

  /**
   *
   * @param json User实体对象
   */
  async add(json: User): Promise<User> { // 可选参数，string类型
    try {
      // 删除id，避免传入id
      // delete json?.id;
      console.log('json', json)
      const result = await this.user.save(json);
      this.logger.success('database user add result:' + JSON.stringify(result));
      return result;
    } catch (error) {
      this.logger.error(`database user add error - ${error}`);
      return undefined;
    }
  }

  /**
   * 根据昵称查询用户
   * @param username 用户昵称
   */
  async findOne(username: string, password?: string): Promise<User> {
    try {
      const user: {
        username: string, password?: string,
      } = { username };
      if (password) {
        user.password = password;
      }
      const info = await this.user.findOne(user);
      this.logger.success('database user findone result:' + JSON.stringify(info));
      return info;
    } catch (error) {
      this.logger.error('database user findone error:', error);
      return undefined;
    }
  }
  /**
   * 用户查重
   * @param username 用户昵称
   */
  async checkOne(username: string): Promise<User> {
    try {
      const info = await this.user.findOne({ username });
      this.logger.success('database user checkOne result:' + JSON.stringify(info));
      return info;
    } catch (error) {
      this.logger.error('database user checkOne error:', error);
      return undefined;
    }
  }
}
