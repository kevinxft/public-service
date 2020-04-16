import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'

@Entity('application')
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Index({ unique: true })
  name: string

  @Column()
  appid: string

  @Column()
  secret: string

  @Column({ default: '' })
  desc: string

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
