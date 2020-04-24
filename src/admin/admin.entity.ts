import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { PasswordTransformer } from './password.transformer'

@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 30, default: 'admin' })
  name: string

  @Column({ length: 30 })
  username: string

  @Column({
    length: 255,
    transformer: new PasswordTransformer(),
  })
  password: string

  @Column({ default: 64 })
  role: number

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
