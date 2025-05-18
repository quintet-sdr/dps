import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { File } from './entities/file.entity'
import { makeCounterProvider } from '@willsoto/nestjs-prometheus'

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [
    FileService,
    makeCounterProvider({
      name: 'file_create_attempts_total',
      help: 'Total number of file upload attempts'
    }),
    makeCounterProvider({
      name: 'file_create_success_total',
      help: 'Total number of successful file uploads'
    }),
    makeCounterProvider({
      name: 'file_create_failed_total',
      help: 'Total number of failed file uploads'
    }),
    makeCounterProvider({
      name: 'file_findall_calls_total',
      help: 'Total number of findAll endpoint calls'
    }),
    makeCounterProvider({
      name: 'file_findforuser_calls_total',
      help: 'Total number of findForUser endpoint calls'
    }),
    makeCounterProvider({
      name: 'file_remove_calls_total',
      help: 'Total number of remove endpoint calls'
    }),
    makeCounterProvider({
      name: 'file_controller_create_calls_total',
      help: 'Total number of create endpoint calls'
    }),
    makeCounterProvider({
      name: 'file_controller_findall_calls_total',
      help: 'Total number of controller findAll endpoint calls'
    }),
    makeCounterProvider({
      name: 'file_controller_findforuser_calls_total',
      help: 'Total number of controller findForUser endpoint calls'
    }),
    makeCounterProvider({
      name: 'file_controller_remove_calls_total',
      help: 'Total number of controller remove endpoint calls'
    })
  ]
})
export class FileModule {}
