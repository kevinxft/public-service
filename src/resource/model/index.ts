import { HttpException, HttpStatus } from '@nestjs/common'
import { FlattererEntity } from './flatterer.entity'

const MODEL = { flatterer: FlattererEntity }

export const getEntity = name => {
  if (MODEL[name]) {
    return MODEL[name]
  }
  throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      message: '该model不存在',
    },
    400,
  )
}

export default MODEL
