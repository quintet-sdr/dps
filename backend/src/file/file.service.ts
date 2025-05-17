import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async create(createFileDto: CreateFileDto, user_id: number) {
    const isExist = await this.fileRepository.findBy({
      owner_id: { id: user_id },
      filename: createFileDto.filename,
    });

    if (isExist.length) {
      throw new BadRequestException('This file is already uploaded');
    }

    const newFile = {
      filename: createFileDto.filename,
      owner_id: { id: user_id },
      uploaded_at: createFileDto.uploaded_at,
    };

    return await this.fileRepository.save(newFile);
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
