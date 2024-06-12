import httpClient, { IHttpClient } from "../../lib/http-client/http-client";
import storageService from "../../lib/storage/storage.service";
import { ITransferPlaylist } from "./interfaces/transfer-playlist.interface";

class SpotifyService {
  private readonly httpClient: IHttpClient;

  constructor() {
    this.httpClient = httpClient;
  }

  async getAuthUrl(): Promise<string> {
    const url = await this.httpClient.get<string>('spotify');

    return url!;
  }

  async login(code: string) {
    const query = `?code=${code}`;

    const response = await this.httpClient.post<{ accessToken: string }>('spotify/login' + query);

    if (!response) throw new Error('Spotify login failed');

    storageService.setSpotifyToken(response!.accessToken);
  }

  async transfer() {
    const spotifyToken = storageService.getSpotifyToken();

    if (spotifyToken) throw new Error('Spotify user is not authenticated');

    const playlistName = storageService.getPlaylistName();

    const tracks = storageService.getTracks();

    const data: ITransferPlaylist = {
      token: spotifyToken,
      playlistName,
      tracks
    };

    await this.httpClient.post('spotify/playlist', data);
  }
}

export default new SpotifyService();