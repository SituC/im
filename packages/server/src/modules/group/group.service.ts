import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group, GroupMap } from './entity/group.entity';
import { GroupMessage } from './entity/groupMessage.entity'
import { LoggerService } from '../../logs/index';


@Injectable()
export class GroupService {
  constructor(
    // @InjectRepository(User) private readonly user: Repository<User>,

    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupMap)
    private readonly groupUserRepository: Repository<GroupMap>,
    @InjectRepository(GroupMessage)
    private readonly groupMessageRepository: Repository<GroupMessage>,
    private readonly logger: LoggerService,
  ) {}

  /**
   *
   * @param json group实体对象
   */
  async add(json: Partial<Group>): Promise<Group> { // 可选参数，string类型
    try {
      const result = await this.groupRepository.save(json);
      this.logger.success('database group add result:' + JSON.stringify(result));
      return result;
    } catch (error) {
      this.logger.error(`database group add error - ${error}`);
      return undefined;
    }
  }
  
  /**
   * 查重
   * @param groupName 群名称
   */
  async checkOne(groupName: string): Promise<Group> {
    try {
      const info = await this.groupRepository.findOne({ groupName });
      this.logger.success(`database groupRepository checkOne result - ' + ${JSON.stringify(info)}`);
      return info;
    } catch (error) {
      this.logger.error('database groupRepository checkOne error:', error);
      return undefined;
    }
  }

  /**
   * 加入群聊
   * @param 
   */
  async join(json: Partial<GroupMap>): Promise<GroupMap> {
    try {
      const result = await this.groupUserRepository.save(json);
      this.logger.success(`database group add result - ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`database group add error - ${error}`);
      return undefined;
    }
  }

  /**
   * 我的群聊列表
   */
  async list({ userId }): Promise<Group[]> {
    try {
      const result = await this.groupUserRepository.find({ userId }) || []
      const groupList: Group[] = []
      for (const item of result) {
        const group = await this.groupRepository.findOne({ id: item.groupId })
        groupList.push(group)
      }
      // console.log(groupList)
      this.logger.success(`database group list - ${JSON.stringify(result)}`);
      return groupList
    } catch (error) {
      // 查询失败返回空数组
      this.logger.error(`database group list error - ${error}`);
      return [];
    }
  }
}
