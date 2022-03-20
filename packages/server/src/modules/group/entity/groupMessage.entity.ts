import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '../../../entity/base.entity'

@Entity()
export class GroupMessage extends BaseEntity {

  @Column()
  userId: string

  @Column()
  groupId: string

  @Column()
  content: string

  @Column('double')
  time: number
}
