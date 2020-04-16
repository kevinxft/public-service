import { IsNotEmpty } from 'class-validator';

export class CreateAdminDto {

  @IsNotEmpty()
  readonly username: string

  
}