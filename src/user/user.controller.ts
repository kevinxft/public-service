import { CreateUserDto } from './dto/create-user.dto'
import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common'
import { DeleteResult } from 'typeorm'

@Controller('user')
export class UserController {
  constructor() {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<any> {
    return 'create'
  }

  @Put(':id')
  async update(@Param('id') id, @Body() body): Promise<any> {
    return body
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return ''
  }

  @Get('init')
  async init(@Param('key') key): Promise<any> {
    if (key === process.env.initKey) {
      
      return 'init success'
    }
    return 'init failed'
  }
}
