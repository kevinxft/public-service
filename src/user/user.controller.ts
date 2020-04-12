import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Post, Body, Delete } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor() {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<any> {
    return 'create'
  }


  @Post('login')
  async login(@Body() body): Promise<any> {
    console.log(body)
    return 'login'
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<DeleteResult> {
    return ''
  }
}

