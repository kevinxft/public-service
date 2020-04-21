import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super()
  }

  async validate() {
    console.log('admin validate')
    return true
  }
}
