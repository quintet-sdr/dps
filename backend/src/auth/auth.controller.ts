import { Controller, Post, UseGuards, Request, Get, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { Response } from 'express'
import { InjectMetric } from '@willsoto/nestjs-prometheus'
import { Counter } from 'prom-client'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectMetric('auth_logout_total')
    private readonly logoutCounter: Counter<string>
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Res() res: Response) {
    const data = await this.authService.login(req.user)
    res.cookie('token', data.token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({ email: data.email, username: data.username })
    return { status: 'ok' }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return req.user
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    this.logoutCounter.inc()
    res.clearCookie('token')
    res.json({ message: 'Logged out' })
  }
}
