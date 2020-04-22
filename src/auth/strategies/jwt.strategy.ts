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

  async validate(payload) {
    console.log(payload)
    if (payload.role > 0) {
      const user =  await this.adminService.validateUser(payload)
      if (!user) {
        throw new UnauthorizedException()
      }
    }
    console.log('jwt validate')
    return true
  }
}
