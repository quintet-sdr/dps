import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { CreateFileDto } from './dto/create-file.dto'
import { Repository } from 'typeorm'
import { File } from './entities/file.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { InjectMetric } from '@willsoto/nestjs-prometheus'
import { Counter } from 'prom-client'

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name)

  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectMetric('file_create_attempts_total')
    private readonly createAttemptsCounter: Counter<string>,
    @InjectMetric('file_create_success_total')
    private readonly createSuccessCounter: Counter<string>,
    @InjectMetric('file_create_failed_total')
    private readonly createFailedCounter: Counter<string>,
    @InjectMetric('file_findall_calls_total')
    private readonly findAllCallsCounter: Counter<string>,
    @InjectMetric('file_findforuser_calls_total')
    private readonly findForUserCallsCounter: Counter<string>,
    @InjectMetric('file_remove_calls_total')
    private readonly removeCallsCounter: Counter<string>
  ) {}

  async create(createFileDto: CreateFileDto, user_id: number) {
    this.createAttemptsCounter.inc()
    this.logger.log(`Попытка загрузки файла: ${createFileDto.filename} пользователем ${user_id}`)

    const isExist = await this.fileRepository.findBy({
      owner_id: { id: user_id },
      filename: createFileDto.filename
    })

    if (isExist.length) {
      this.createFailedCounter.inc()
      this.logger.warn(
        `Провал загрузки: файл уже существует (${createFileDto.filename}) для пользователя ${user_id}`
      )
      throw new BadRequestException('This file is already uploaded')
    }

    const owner = await this.fileRepository.manager.findOne('User', { where: { id: user_id } })
    if (!owner) {
      this.createFailedCounter.inc()
      this.logger.warn(`Провал загрузки: пользователь не найден (${user_id})`)
      throw new BadRequestException('User not found')
    }

    const newFile = this.fileRepository.create({
      filename: createFileDto.filename,
      owner_id: owner
    })

    const savedFile = await this.fileRepository.save(newFile)
    this.createSuccessCounter.inc()
    this.logger.log(`Успешная загрузка файла: ${createFileDto.filename} пользователем ${user_id}`)

    return savedFile
  }

  async findAll() {
    this.findAllCallsCounter.inc()
    this.logger.log('Вызван эндпоинт получения всех файлов')
    const files = await this.fileRepository.find({ relations: ['owner_id'] })
    const result = files.map((file) => ({
      ...file,
      owner_id: file.owner_id?.id
    }))
    return { files: result }
  }

  async findForUser(userId: number) {
    this.findForUserCallsCounter.inc()
    this.logger.log(`Вызван эндпоинт получения файлов пользователя: ${userId}`)
    const usersFiles = await this.fileRepository.find({
      where: { owner_id: { id: userId } },
      relations: ['owner_id']
    })
    return usersFiles.map((file) => ({
      ...file,
      owner_id: file.owner_id?.id
    }))
  }

  remove(id: number) {
    this.removeCallsCounter.inc()
    this.logger.log(`Вызван эндпоинт удаления файла: ${id}`)
    return `This action removes a #${id} file`
  }
}
