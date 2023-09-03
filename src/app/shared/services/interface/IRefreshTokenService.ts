export interface IRefreshTokenService {
    refreshToken: () => Promise<string>;
}