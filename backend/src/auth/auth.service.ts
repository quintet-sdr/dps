import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import * as argon2 from 'argon2'
import { User } from '../user/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '../types/user.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOne(email)
    if (!user) {
      throw new UnauthorizedException('Such user not registered')
    }
    const password_match = await argon2.verify(user.password_hash, pass)

    if (user && password_match) {
      return user
    }
    throw new UnauthorizedException('User or password are incorrect')
  }

  async login(user: IUser) {
    const { id, username, email } = user
    return {
      id,
      email,
      username,
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        username: user.username
      })
    }
  }
}
