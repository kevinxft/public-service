import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { AdminService} from '../admin/admin.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    return false
  }

  async sign(payload: any) {
    return this.jwtService.sign(payload)
  }
}
