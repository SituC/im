import { Entity, Column } from 'typeorm'
import { BaseEntity } from '../../../entity/base.entity'
@Entity()
export class User extends BaseEntity {

  @Column({ comment: '昵称' })
  username?: string

  @Column({ comment: '密码' })
  password?: string

  @Column({ comment: '状态', default: 'on' })
  status?: string

}
