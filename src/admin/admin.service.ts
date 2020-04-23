import { AuthService } from './../auth/auth.service'
import { AdminEntity } from './admin.entity'
import {
  Injectable,
  Param,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import * as argon2 from 'argon2'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminEntity: Repository<AdminEntity>,
    private readonly authService: AuthService,
  ) {}

  async init(@Param('key') key): Promise<any> {
    if (key === process.env.initKey) {
      const username = process.env.admin
      const password = process.env.password

      const admin = await this.adminEntity.findOne({ username })
      if (admin) {
        admin.password = password
        await this.adminEntity.save(admin)
      } else {
        const newAdmin = new AdminEntity()
        newAdmin.password = password
        newAdmin.username = username
        await this.adminEntity.save(newAdmin)
      }
      return 'init successful'
    }
    return 'init failed'
  }

  async findOne({ username }): Promise<AdminEntity> {
    const admin = await this.adminEntity.findOne({ username })
    if (admin) {
      return admin
    }
    return null
  }

  async updateOne(payload: any): Promise<AdminEntity> {
    const { username, password, name, role } = payload
    const admin = await this.adminEntity.findOne({ username })
    admin.password = password
    admin.name = name
    admin.role = role
    return admin
  }

  async login(payload: any): Promise<any> {
    const { username, password } = payload
    const admin = await this.adminEntity.findOne({ username })
    if (!admin) {
      return null
    }
    if (await argon2.verify(admin.password, password)) {
      const { role } = admin
      const _payload = {
        username,
        role,
      }
      const token = await this.authService.sign(_payload)
      return {
        token,
      }
    }
  }

  async validateUser({ username }) {
    const admin = await this.adminEntity.findOne({ username })
    if (admin && admin.role === 64) {
      const { password, ...rest } = admin
      return rest
    }
    return null
  }

  async isAdmin(username: string = ''): Promise<boolean> {
    const admin = await this.adminEntity.findOne({ username })
    return admin && admin.role === 64
  }
}
