import { IsEmail, Matches, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty()
  @MinLength(4, { message: 'Username must be at least 4 symbols' })
  username: string

  @ApiProperty()
  @IsEmail()
  @Matches(/^[\w.-]+@innopolis.university$/, {
    message: 'Only for Innopolis users'
  })
  email: string

  @ApiProperty()
  @MinLength(8, { message: 'Password must be more than 8 symbols' })
  password: string
}
