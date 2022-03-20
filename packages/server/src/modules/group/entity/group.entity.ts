import { Entity, Column, } from 'typeorm'
import { BaseEntity } from '../../../entity/base.entity'

@Entity()
export class Group extends BaseEntity {

  @Column()
  userId: string

  @Column()
  groupName: string

}

@Entity()
export class GroupMap extends BaseEntity {

  @Column()
  groupId: string

  @Column()
  userId: string

}
