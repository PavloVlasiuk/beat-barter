import { Track } from "../../../types/track";

export interface ITransferPlaylist {
  token: string;
  playlistName: string;
  tracks: Array<Track>;
}