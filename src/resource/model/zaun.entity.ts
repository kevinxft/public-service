import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('zaun')
export class ZaunEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
