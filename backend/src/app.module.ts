import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { ChunkModule } from './chunk/chunk.module';
import { NodeModule } from './node/node.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    FileModule,
    ChunkModule,
    NodeModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
