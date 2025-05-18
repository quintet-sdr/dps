import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from './strategies/jwt.strategy'
import { makeCounterProvider } from '@willsoto/nestjs-prometheus'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '20d' }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    makeCounterProvider({
      name: 'auth_login_attempts_total',
      help: 'Total number of login attempts'
    }),
    makeCounterProvider({
      name: 'auth_login_success_total',
      help: 'Total number of successful logins'
    }),
    makeCounterProvider({
      name: 'auth_login_failed_total',
      help: 'Total number of failed logins'
    }),
    makeCounterProvider({
      name: 'auth_logout_total',
      help: 'Total number of logouts'
    })
  ]
})
export class AuthModule {}
