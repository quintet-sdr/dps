import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    })

    if (existUser) {
      throw new BadRequestException('User with this email already exists')
    }

    const user = await this.userRepository.save({
      username: createUserDto.username,
      email: createUserDto.email,
      password_hash: await argon2.hash(createUserDto.password)
    })

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
