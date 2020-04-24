import { ValueTransformer } from 'typeorm'
import * as Crypto from 'crypto-js'
import * as Base64 from 'crypto-js/enc-base64'
const { HmacSHA1 } = Crypto

export class PasswordTransformer implements ValueTransformer {
  from(value: string) {
    return value
  }
  to(value: string) {
    return Base64.stringify(HmacSHA1(value, process.env.passwordSecret))
  }
}
