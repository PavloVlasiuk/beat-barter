import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class YoutubeMusicService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getPlaylistTracks(id: string) {
    const playlistMaxResults = this.configService.get<string>(
      'platform.youtubeMusic.playlistMaxResults',
    );

    const apiUrl = this.configService.get<string>(
      'platform.youtubeMusic.apiUrl',
    );

    const apiKey = this.configService.get<string>(
      'platform.youtubeMusic.apiKey',
    );

    const queries = [];

    queries.push(`maxResults=${playlistMaxResults}`);
    queries.push('part=snippet%2CcontentDetails');
    queries.push(`playlistId=${id}`);
    queries.push(`key=${apiKey}`);

    const requestUrl = `${apiUrl}playlistItems?${queries.join('&')}`;

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
        track: item.snippet.title,
        artist: artist.slice(0, artist.lastIndexOf('-') - 1),
      };
    });

    return tracks;
  }
}
