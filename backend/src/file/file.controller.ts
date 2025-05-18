import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common'
import { FileService } from './file.service'
import { CreateFileDto } from './dto/create-file.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createFileDto: CreateFileDto, @Request() req) {
    const user_id = req.user.id
    return this.fileService.create(createFileDto, user_id)
  }

  @Get()
  findAll() {
    return this.fileService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') owner_id: number) {
    return this.fileService.findOne(+owner_id)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fileService.remove(+id)
  }
}
