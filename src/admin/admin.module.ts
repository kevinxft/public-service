import { AuthModule } from './../auth/auth.module';
import { AdminEntity } from './admin.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    forwardRef(() => AuthModule),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([AdminEntity]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
