export interface IRefreshTokenService {
    refreshToken: (refreshToken: string) => Promise<string>;
}