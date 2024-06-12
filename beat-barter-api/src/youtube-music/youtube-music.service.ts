import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class YoutubeMusicService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiUrl = this.configService.get<string>(
      'platform.youtubeMusic.apiUrl',
    );

    this.apiKey = this.configService.get<string>(
      'platform.youtubeMusic.apiKey',
    );
  }

  async getPlaylistTracks(id: string) {
    const playlistMaxResults = this.configService.get<string>(
      'platform.youtubeMusic.playlistMaxResults',
    );

    const queries = [];

    queries.push(`maxResults=${playlistMaxResults}`);
    queries.push('part=snippet%2CcontentDetails');
    queries.push(`playlistId=${id}`);
    queries.push(`key=${this.apiKey}`);

    const requestUrl = `${this.apiUrl}playlistItems?${queries.join('&')}`;

    const { data } = await firstValueFrom(
      this.httpService.get(requestUrl).pipe(
        catchError((error: AxiosError) => {
          console.log(error.message);
          throw new Error(error.message);
        }),
      ),
    );

    const tracks = data.items.map((item) => {
      const artist = item.snippet.videoOwnerChannelTitle;
      return {
        name: item.snippet.title,
        artist: artist.slice(0, artist.lastIndexOf('-') - 1),
      };
    });

    return tracks;
  }

  async getPlaylistName(id: string) {
    const queries = [];

    queries.push('part=snippet');
    queries.push(`id=${id}`);
    queries.push(`key=${this.apiKey}`);

    const requestUrl = `${this.apiUrl}playlists?${queries.join('&')}`;

    const { data } = await firstValueFrom(
      this.httpService.get(requestUrl).pipe(
        catchError((error: AxiosError) => {
          console.log(error.message);
          throw new NotFoundException(error.message);
        }),
      ),
    );

    const name = data.items[0].snippet.title;

    if (!name)
      throw new NotFoundException('Playlist with such id was not found');

    return { name };
  }
}
