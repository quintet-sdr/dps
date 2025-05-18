import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { makeCounterProvider } from '@willsoto/nestjs-prometheus'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '20d' }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [UserController],
  providers: [
    UserService,
    makeCounterProvider({
      name: 'user_register_attempts_total',
      help: 'Total number of user registration attempts'
    }),
    makeCounterProvider({
      name: 'user_register_success_total',
      help: 'Total number of successful user registrations'
    }),
    makeCounterProvider({
      name: 'user_register_failed_total',
      help: 'Total number of failed user registrations'
    }),
    makeCounterProvider({
      name: 'user_controller_register_calls_total',
      help: 'Total number of register endpoint calls'
    }),
    makeCounterProvider({
      name: 'user_controller_findall_calls_total',
      help: 'Total number of findAll endpoint calls'
    }),
    makeCounterProvider({
      name: 'user_controller_findone_calls_total',
      help: 'Total number of findOne endpoint calls'
    }),
    makeCounterProvider({
      name: 'user_controller_remove_calls_total',
      help: 'Total number of remove endpoint calls'
    })
  ],
  exports: [UserService]
})
export class UserModule {}
