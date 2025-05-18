import { BadRequestException, Inject, Injectable, UseGuards } from '@nestjs/common'
import { CreateFileDto } from './dto/create-file.dto'
import { Repository } from 'typeorm'
import { File } from './entities/file.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>
  ) {}

  async create(createFileDto: CreateFileDto, user_id: number) {
    const isExist = await this.fileRepository.findBy({
      owner_id: { id: user_id },
      filename: createFileDto.filename
    })

    if (isExist.length) {
      throw new BadRequestException('This file is already uploaded')
    }

    const newFile = {
      filename: createFileDto.filename,
      owner_id: { id: user_id }
    }

    return await this.fileRepository.save(newFile)
  }

  async findAll() {
    const files = await this.fileRepository.find({ relations: ['owner_id'] })
    const result = files.map((file) => ({
      ...file,
      owner_id: file.owner_id?.id
    }))
    return { files: result }
  }

  async findForUser(userId: number) {
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
    return `This action removes a #${id} file`
  }
}
