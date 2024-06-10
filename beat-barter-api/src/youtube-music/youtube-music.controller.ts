import { Controller, Get, Param } from '@nestjs/common';
import { YoutubeMusicService } from './youtube-music.service';

@Controller('youtube-music')
export class YoutubeMusicController {
  constructor(private readonly youtubeMusicService: YoutubeMusicService) {}

  @Get('playlist/:id')
  async getPlaylistTracks(@Param('id') id: string) {
    return await this.youtubeMusicService.getPlaylistTracks(id);
  }
}
