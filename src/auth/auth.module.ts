import { AdminModule } from './../admin/admin.module';
import { JwtStrategy } from './strategies/jwt.strategy'
import { UserModule } from './../user/user.module'
import { AuthService } from './auth.service'
import { Module, forwardRef } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { ConfigModule } from '@nestjs/config'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
})

@Module({
  imports: [
    forwardRef(() => AdminModule),
    UserModule,
    ConfigModule.forRoot(),
    passportModule,
    JwtModule.register({
      secret: process.env.secret,
      signOptions: { expiresIn: process.env.expiresIn },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, passportModule],
  controllers: [AuthController],
})
export class AuthModule {}
