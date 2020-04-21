import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('poetry')
export class ZaunEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Index()
  name: string

  @Column()
  dynasty: string

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
