import { StorageKeys } from "../../types/enums/storage-keys.enum";
import { Track } from "../../types/track";

class StorageService {
    setTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem(StorageKeys.AccessToken, accessToken);
        localStorage.setItem(StorageKeys.RefreshToken, refreshToken);
    }

    getAccessToken() :string {
        return localStorage.getItem(StorageKeys.AccessToken)!;
    }

    getRefreshToken() :string {
        return localStorage.getItem(StorageKeys.RefreshToken)!;
    }

    setPlaylistName(name: string) {
        localStorage.setItem(StorageKeys.PlaylistName, name);
    }

    getPlaylistName(): string {
        const defaulName = 'Transfered playlist';

        return localStorage.getItem(StorageKeys.PlaylistName) ?? defaulName;
    }

    setTracks(tracks: Array<Track>): void {
        const tracksJson = JSON.stringify(tracks);

        localStorage.setItem(StorageKeys.Tracks, tracksJson);
    }

    getTracks(): Array<Track> {
        const tracksJson = localStorage.getItem(StorageKeys.Tracks);

        return JSON.parse(tracksJson!);
    }

    setSpotifyToken(token: string) {
        localStorage.setItem(StorageKeys.SpotifyToken, token);
    }

    getSpotifyToken(): string {
        const token = localStorage.getItem(StorageKeys.SpotifyToken);
        // trhrow error or return false if tokens is endefined
        return token!;
    }
}

export default new StorageService()