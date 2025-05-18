import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Logger
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'
import { CreateFileDto } from './dto/create-file.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Express } from 'express'
import { InjectMetric } from '@willsoto/nestjs-prometheus'
import { Counter } from 'prom-client'

@UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
  private readonly logger = new Logger(FileController.name)

  constructor(
    private readonly fileService: FileService,
    @InjectMetric('file_controller_create_calls_total')
    private readonly createCallsCounter: Counter<string>,
    @InjectMetric('file_controller_findall_calls_total')
    private readonly findAllCallsCounter: Counter<string>,
    @InjectMetric('file_controller_findforuser_calls_total')
    private readonly findForUserCallsCounter: Counter<string>,
    @InjectMetric('file_controller_remove_calls_total')
    private readonly removeCallsCounter: Counter<string>
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
    @Request() req
  ) {
    this.createCallsCounter.inc()
    this.logger.log('Вызван эндпоинт загрузки файла')
    const user_id = req.user.id
    return this.fileService.create(createFileDto, user_id)
  }

  @Get()
  findAll() {
    this.findAllCallsCounter.inc()
    this.logger.log('Вызван эндпоинт получения всех файлов')
    return this.fileService.findAll()
  }

  @Get(':id')
  findForUser(@Param('id') owner_id: number) {
    this.findForUserCallsCounter.inc()
    this.logger.log(`Вызван эндпоинт получения файлов пользователя: ${owner_id}`)
    return this.fileService.findForUser(+owner_id)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.removeCallsCounter.inc()
    this.logger.log(`Вызван эндпоинт удаления файла: ${id}`)
    return this.fileService.remove(+id)
  }
}
