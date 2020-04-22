import { AdminModule } from './../admin/admin.module';
import { AuthModule } from './../auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { FlattererEntity } from './model/flatterer.entity'
import { ResourceService } from './resource.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'
import { ResourceController } from './resource.controller'

@Module({
  imports: [
    forwardRef(() => AuthModule),
    AdminModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([FlattererEntity]),
  ],
  providers: [ResourceService],
  controllers: [ResourceController],
})
export class ResourceModule {}
