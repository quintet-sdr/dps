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
  UploadedFile
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'
import { CreateFileDto } from './dto/create-file.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Express } from 'express'

@UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
    @Request() req
  ) {
    const user_id = req.user.id
    return this.fileService.create(createFileDto, user_id)
  }

  @Get()
  findAll() {
    return this.fileService.findAll()
  }

  @Get(':id')
  findForUser(@Param('id') owner_id: number) {
    return this.fileService.findForUser(+owner_id)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fileService.remove(+id)
  }
}
