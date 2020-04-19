import { FlattererEntity } from './model/flatterer.entity';
import { ResourceService } from './resource.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { ResourceController } from './resource.controller'

@Module({
  imports: [TypeOrmModule.forFeature([FlattererEntity])],
  providers: [ResourceService],
  controllers: [ResourceController],
})
export class ResourceModule {}
