import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Res,
  UseGuards,
  Logger
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { Response } from 'express'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { InjectMetric } from '@willsoto/nestjs-prometheus'
import { Counter } from 'prom-client'

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(
    private readonly userService: UserService,
    @InjectMetric('user_controller_register_calls_total')
    private readonly registerCallsCounter: Counter<string>,
    @InjectMetric('user_controller_findall_calls_total')
    private readonly findAllCallsCounter: Counter<string>,
    @InjectMetric('user_controller_findone_calls_total')
    private readonly findOneCallsCounter: Counter<string>,
    @InjectMetric('user_controller_remove_calls_total')
    private readonly removeCallsCounter: Counter<string>
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    this.registerCallsCounter.inc()
    this.logger.log('Вызван эндпоинт регистрации пользователя')
    const { user, token } = await this.userService.create(createUserDto)
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.json({ user })
  }

  @Get()
  async findAll() {
    this.findAllCallsCounter.inc()
    this.logger.log('Вызван эндпоинт получения всех пользователей')
    return this.userService.findAll()
  }

  @Get('internal/:email')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('email') email: string) {
    this.findOneCallsCounter.inc()
    this.logger.log(`Вызван эндпоинт поиска пользователя: ${email}`)
    return this.userService.findOne(email)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.removeCallsCounter.inc()
    this.logger.log(`Вызван эндпоинт удаления пользователя: ${id}`)
    return this.userService.remove(+id)
  }
}
