import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { FeedbackModule } from './feedback/feedback.module'
import { ApplicationModule } from './application/application.module'
import { AdminModule } from './admin/admin.module'
import { ResourceController } from './resource/resource.controller';
import { ResourceService } from './resource/resource.service';
import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    FeedbackModule,
    AppModule,
    ApplicationModule,
    AdminModule,
    ResourceModule,
  ],
  controllers: [AppController, ResourceController],
  providers: [AppService, ResourceService],
})
export class AppModule {}
