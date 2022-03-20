import { Controller, Post, HttpStatus, Body, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { LoggerService } from '../../logs/index';
import { GroupService, } from './group.service'
import { ApiException } from '../../exception/api.exception';
import { ApiErrorCode } from '../../enums/api-error-code.enum';

@Controller('group')
@UseGuards(AuthGuard())
export class GroupController {
  constructor(
    private groupService: GroupService,
    private logger: LoggerService,
    // private logger = new Logger()
  ) {}
  @Post('create')
  async createGroup(@Body() body, @Request() req) {
    const { groupName } = body;
    const user = req.user || {}
    // console.log('cookie', req.session);
    console.log(req.user)
    // this.logger.success('请求参数:' + JSON.stringify(body));
    try {
      // 查重
      const findResult = await this.groupService.checkOne(groupName);
      if (findResult === undefined) {
        // 创建群聊
        const result = await this.groupService.add({ 
          groupName,
          userId: user.id,
          createdTime: new Date().valueOf()
        });
        // 默认加入群聊
        await this.groupService.join({
          userId: user.id,
          groupId: result.id
        })
        if (result?.id) {
          return {
            msg: '创建群聊成功',
            group: result,
          };
        }
      } else {
        throw {errorCode: ApiErrorCode.ERROR_TOAST, status: HttpStatus.OK, message: '群名称已存在'};
      }
    } catch (error) {
      throw new ApiException(error.message, error.errorCode, error.status);
    }
  }

  @Post('list')
  async userGroupList(@Body() Body, @Request() req) {
    const user = req.user || {}
    try {
      const result = await this.groupService.list({ userId: user.id });
      return {
        list: result
      }
    } catch (error) {
      throw new ApiException(error.message, error.errorCode, error.status);
    }

  }
}