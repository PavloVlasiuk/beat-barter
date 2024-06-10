import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { AddTracksToPlaylistDto } from './dtos/add-tracks-to-playlist.dto';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get()
  getloginUrl(): string {
    return this.spotifyService.getLoginUrl();
  }

  @Post('login')
  async login(@Query('code') code: string) {
    return await this.spotifyService.login(code);
  }

  @Post('playlist')
  async addTracksToPlaylist(@Body() body: AddTracksToPlaylistDto) {
    return await this.spotifyService.addTracksToPlaylist(body);
  }
}
