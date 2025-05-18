import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { InjectMetric } from '@willsoto/nestjs-prometheus'
import { Counter } from 'prom-client'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectMetric('user_register_attempts_total')
    private readonly registerAttemptsCounter: Counter<string>,
    @InjectMetric('user_register_success_total')
    private readonly registerSuccessCounter: Counter<string>,
    @InjectMetric('user_register_failed_total')
    private readonly registerFailedCounter: Counter<string>
  ) {}

  async create(createUserDto: CreateUserDto) {
    this.registerAttemptsCounter.inc()
    this.logger.log(`Попытка регистрации: ${createUserDto.email}`)

    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    })

    if (existUser) {
      this.registerFailedCounter.inc()
      this.logger.warn(`Провал регистрации: пользователь уже существует (${createUserDto.email})`)
      throw new BadRequestException('User with this email already exists')
    }

    const user = await this.userRepository.save({
      username: createUserDto.username,
      email: createUserDto.email,
      password_hash: await argon2.hash(createUserDto.password)
    })

    this.registerSuccessCounter.inc()
    this.logger.log(`Успешная регистрация: ${createUserDto.email}`)

    const token = this.jwtService.sign({
      email: createUserDto.email,
      username: createUserDto.username
    })

    return { user, token }
  }

  findAll() {
    return `This action returns all user`
  }

  async findOne(email: string) {
    return this.userRepository.findOne({ where: { email } })
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
