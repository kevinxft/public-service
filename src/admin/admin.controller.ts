import { LoginAdminDto } from './dto/login-admin.dto'
import { AdminService } from './admin.service'
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  HttpException,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('init/:key')
  async init(@Param('key') key): Promise<any> {
    return await this.adminService.init(key)
  }

  @Get('test')
  async test(): Promise<any> {
    return 'test'
  }

  @Put('update/:username')
  async update(@Param('username') username): Promise<any> {
    return 'update'
  }

  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() body: LoginAdminDto): Promise<any> {
    const res = await this.adminService.login(body)
    if (res) {
      return res
    }
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        message: '用户名或密码错误',
      },
      400,
    )
  }
}
