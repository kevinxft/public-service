import { UserEntity } from './user.entity'
import { Injectable, Body, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserRes, UsersRes } from './user.interface'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UsersRes> {
    const res = await this.userEntity.find({})
    return {
      data: res,
      count: res.length,
    }
  }

  async findOne(username: string): Promise<UserEntity> {
    return await this.userEntity.findOne({ username })
  }

  async login(@Body() body): Promise<any> {
    const { username, password } = body
    if (!username || !password) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '用户名和密码不能为空',
        },
        400,
      )
    }
    const user = await this.userEntity.find({ username })
    if (user) {
      console.log(user)
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '用户名或密码错误',
        },
        400,
      )
    }
  }
}
