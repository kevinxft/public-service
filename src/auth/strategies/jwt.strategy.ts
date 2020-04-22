import { AdminService } from 'src/admin/admin.service'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.secret,
    })
  }

  async validate(payload): Promise<boolean> {
    if (payload.role === 64) {
      const user =  await this.adminService.validateUser(payload)
      if (!user) {
        throw new UnauthorizedException()
      }
      return true
    }
    return false
  }
}
