import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Index,
} from 'typeorm'

@Entity('flatterer')
export class FlattererEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Index({ unique: true })
  content: string

  @Column({ default: '' })
  desc: string

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
