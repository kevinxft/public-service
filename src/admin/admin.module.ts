import { AdminEntity } from './admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot(), 
    PassportModule.register({ defaultStrategy: 'admin'}),
    JwtModule.register({
      secret: process.env.secret,
      signOptions: { expiresIn: process.env.expiresIn },
    }),
    TypeOrmModule.forFeature([AdminEntity])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
