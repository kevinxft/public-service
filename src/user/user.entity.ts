import {
  Entity,
  Column,
  Index,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  @Index({ unique: true })
  username: string

  @Column()
  password: string

  @Column({ default: '' })
  desc: string

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
