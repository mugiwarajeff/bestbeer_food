export default interface IStorageService {

    saveAccessToken(accessToken: string) : void;

    saveRefreshToken(refreshToken: string) : void;

    getAccessToken(): string;

    getRefreshToken(): string;

    clearStorage(): void
}