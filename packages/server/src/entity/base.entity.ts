import { PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({
      type: 'double',
      nullable: false,
      name: 'created_at',
      comment: '创建时间',
      default: new Date().valueOf(),
    })
    createdTime?: number;

    @Column({
      type: 'double',
      nullable: false,
      name: 'update_at',
      comment: '更新时间',
      default: new Date().valueOf(),
    })
    updatedTime?: number;
}

