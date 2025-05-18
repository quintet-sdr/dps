import * as crypto from 'crypto'
;(global as any).crypto = crypto

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())

  const configService = app.get(ConfigService)
  const frontendOrigin = configService.get<string>('FRONTEND_ORIGIN')
  const serverPort = configService.get<number>('SERVER_PORT')

  const config = new DocumentBuilder()
    .setTitle('Endpoints description')
    .setDescription('The cast API description')
    .setVersion('1.0')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, documentFactory)

  app.setGlobalPrefix('api')
  app.enableCors({
    origin: frontendOrigin,
    credentials: true
  })
  await app.listen(serverPort ?? 8000)
}

bootstrap()
