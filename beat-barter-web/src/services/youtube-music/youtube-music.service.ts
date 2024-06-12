import httpClient, { IHttpClient } from "../../lib/http-client/http-client";
import storageService from "../../lib/storage/storage.service";
import { Track } from "../../types/track";

class YoutubeMusicService {
  private readonly httpClient: IHttpClient;

  constructor() {
    this.httpClient = httpClient;
  }

  async getPlaylistTracks(playlistId: string) {
    const tracks = await this.httpClient.get<Array<Track>>('youtube-music/playlist/' + playlistId);

    storageService.setTracks(tracks!);

    return tracks;
  }

  async getPlaylistName(playlistId: string) {
    const data = await this.httpClient.get<{name: string}>('youtube-music/playlist/name/' + playlistId);

    storageService.setPlaylistName(data!.name);

    return data?.name;
  }
}

export default new YoutubeMusicService()