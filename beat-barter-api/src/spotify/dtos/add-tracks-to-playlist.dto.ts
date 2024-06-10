import { IsArray, IsString } from 'class-validator';

export class AddTracksToPlaylistDto {
  @IsString()
  token: string;

  @IsArray()
  tracks: Array<{ name: string; artist: string }>;

  @IsString()
  playlistName: string;
}
