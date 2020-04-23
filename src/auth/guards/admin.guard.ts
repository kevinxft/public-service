import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { AdminService } from 'src/admin/admin.service'
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest()
    return await this.adminService.isAdmin(user.username)
  }
}
