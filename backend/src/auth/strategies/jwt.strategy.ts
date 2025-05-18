import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { IUser } from '../../types/user.interface'
import { Request } from 'express'

function extractJWT(req: Request): string | null {
  if (req.cookies && req.cookies.token) {
    return req.cookies.token
  }
  return null
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET')
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables')
    }
    super({
      jwtFromRequest: extractJWT,
      ignoreExpiration: false,
      secretOrKey: secret
    })
  }

  async validate(user: IUser) {
    return { id: user.id, email: user.email, username: user.username }
  }
}
