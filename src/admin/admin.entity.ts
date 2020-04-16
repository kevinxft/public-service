import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import * as argon2 from 'argon2'

@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 30, default: 'admin' })
  name: string

  @Column({ length: 30 })
  username: string

  @Column()
  password: string

  @Column({ default: 64 })
  role: number

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password)
  }

  @BeforeUpdate()
  async hashUpdatePassword() {
    this.password = await argon2.hash(this.password)
  }

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
