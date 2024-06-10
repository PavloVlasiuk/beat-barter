import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AddTracksToPlaylistDto } from './dtos/add-tracks-to-playlist.dto';

@Injectable()
export class SpotifyService {
  private readonly baseAuthUrl: string;
  private readonly apiUrl: string;
  private readonly redirectUri: string;
  private readonly clientId: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseAuthUrl = this.configService.get<string>(
      'platform.spotify.baseAuthUrl',
    );

    this.apiUrl = this.configService.get<string>('platform.spotify.apiUrl');

    this.redirectUri = this.configService.get<string>(
      'platform.spotify.redirectUri',
    );

    this.clientId = this.configService.get<string>('platform.spotify.clientId');
  }

  getLoginUrl(): string {
    const scopes = this.configService.get<Array<string>>(
      'platform.spotify.scopes',
    );

    const queries: Array<string> = [];

    queries.push(`client_id=${this.clientId}`);
    queries.push('response_type=code');
    queries.push(`redirect_uri=${this.redirectUri}`);
    queries.push('show_dialog=true');
    queries.push(`scope=${encodeURIComponent(scopes.join(' '))}`);

    const loginUrl = `${this.baseAuthUrl}authorize?${queries.join('&')}`;

    return loginUrl;
  }

  async login(code: string): Promise<{ accessToken: string }> {
    const clientSecret = this.configService.get<string>(
      'platform.spotify.clientSecret',
    );

    const bodyFields = [];

    bodyFields.push('grant_type=authorization_code');
    bodyFields.push(`code=${code}`);
    bodyFields.push(`redirect_uri=${this.redirectUri}`);

    const { data } = await firstValueFrom(
      this.httpService
        .post(this.baseAuthUrl + 'api/token', bodyFields.join('&'), {
          headers: {
            Authorization: 'Basic ' + btoa(this.clientId + ':' + clientSecret),
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.message);
            throw new ServiceUnavailableException('Spotify API is unavailable');
          }),
        ),
    );
    return { accessToken: data.access_token };
  }

  async addTracksToPlaylist({
    token,
    tracks,
    playlistName,
  }: AddTracksToPlaylistDto) {
    const playlistId = await this.createPlaylist(token, playlistName);

    const uris = await this.searchTracks(token, tracks);

    await this.requestPost(`playlists/${playlistId}/tracks`, { uris }, token);
  }

  private async searchTracks(
    token: string,
    tracks: Array<{ name: string; artist: string }>,
  ) {
    const findRequests = tracks
      .map((track) =>
        encodeURIComponent(`${track.name} artist:${track.artist}`),
      )
      .map((query) =>
        this.requestGet(`search?q=${query}&type=track&limit=1&offset=0`, token),
      );

    const foundTracks = Promise.all(findRequests)
      .then((responses) => {
        return responses
          .filter((res) => res.tracks.items.length > 0)
          .map((res) => res.tracks.items[0].uri);
      })
      .catch((error) => console.log(error));

    return foundTracks;
  }

  private async createPlaylist(token: string, name: string) {
    const body = {
      name,
      public: true,
    };

    const userId = await this.getUserId(token);

    const playlist = await this.requestPost(
      `users/${userId}/playlists`,
      body,
      token,
    );

    return playlist.id;
  }

  private async getUserId(token: string): Promise<string> {
    const user = await this.requestGet('me', token);

    if (!user) throw new NotFoundException();

    return user.id;
  }

  private async requestPost(endpoint: string, body: object, token: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .post(this.apiUrl + endpoint, JSON.stringify(body), {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.message);
            throw new ServiceUnavailableException('Spotify API is unavailable');
          }),
        ),
    );

    return data;
  }

  private async requestGet(endpoint: string, token: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(this.apiUrl + endpoint, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.message);
            throw new ServiceUnavailableException('Spotify API is unavailable');
          }),
        ),
    );

    return data;
  }
}
