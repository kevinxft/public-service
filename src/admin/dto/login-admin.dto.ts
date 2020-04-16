import { IsNotEmpty, MinLength, MaxLength } from 'class-validator'
import { Type } from 'class-transformer'

export class LoginAdminDto {
  @Type(() => String)
  @IsNotEmpty({ message: '用户名不能为空' })
  @MinLength(5, { message: '用户名不能小于5个字符' })
  @MaxLength(50, { message: '用户名不能大于20个字符' })
  readonly username: string

  @Type(() => String)
  @IsNotEmpty()
  @MinLength(6, { message: '密码不能低于6个字符' })
  @MaxLength(50, { message: '密码不能大于50个字符' })
  readonly password: string
}
