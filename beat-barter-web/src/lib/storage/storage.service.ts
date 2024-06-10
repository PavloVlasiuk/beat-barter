import { StorageKeys } from "../../types/enums/storage-keys.enum";

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
}

export default new StorageService()