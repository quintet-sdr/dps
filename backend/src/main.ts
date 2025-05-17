import * as crypto from 'crypto'
;(global as any).crypto = crypto

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Endpoints description')
    .setDescription('The cast API description')
    .setVersion('1.0')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, documentFactory)

  app.setGlobalPrefix('api')
  app.enableCors()
  await app.listen(process.env.PORT ?? 8000)
}
bootstrap()
