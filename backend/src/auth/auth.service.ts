import { Injectable, UnauthorizedException, Logger } from '@nestjs/common'
import { UserService } from '../user/user.service'
import * as argon2 from 'argon2'
import { User } from '../user/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '../types/user.interface'
import { InjectMetric } from '@willsoto/nestjs-prometheus'
import { Counter } from 'prom-client'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectMetric('auth_login_attempts_total')
    private readonly loginAttemptsCounter: Counter<string>,
    @InjectMetric('auth_login_success_total')
    private readonly loginSuccessCounter: Counter<string>,
    @InjectMetric('auth_login_failed_total')
    private readonly loginFailedCounter: Counter<string>
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    this.loginAttemptsCounter.inc()
    this.logger.log(`Попытка входа: ${email}`)

    const user = await this.userService.findOne(email)
    if (!user) {
      this.loginFailedCounter.inc()
      this.logger.warn(`Провал входа: пользователь не найден (${email})`)
      throw new UnauthorizedException('Such user not registered')
    }
    const password_match = await argon2.verify(user.password_hash, pass)

    if (user && password_match) {
      this.loginSuccessCounter.inc()
      this.logger.log(`Успешный вход: ${email}`)
      return user
    }
    this.loginFailedCounter.inc()
    this.logger.warn(`Провал входа: неверный пароль (${email})`)
    throw new UnauthorizedException('User or password are incorrect')
  }

  async login(user: IUser) {
    const { id, username, email } = user
    this.logger.log(`Генерация JWT для пользователя: ${email}`)
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
