import { Module } from '@nestjs/common';
import { YoutubeMusicService } from './youtube-music.service';
import { YoutubeMusicController } from './youtube-music.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [YoutubeMusicController],
  providers: [YoutubeMusicService],
})
export class YoutubeMusicModule {}
