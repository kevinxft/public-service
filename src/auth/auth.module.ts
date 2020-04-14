import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'
import { UserModule } from './../user/user.module'
import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.secret,
      signOptions: { expiresIn: process.env.expiresIn },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
