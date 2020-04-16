import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm'
import { ApplicationEntity } from '../application/application.entity'

@Entity('feedback')
export class FeedbackEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 256 })
  content: string

  @Column()
  appid: number

  @OneToOne(
    type => ApplicationEntity,
    app => app.name,
  )
  appName: ApplicationEntity

  @CreateDateColumn()
  created: Date
}
