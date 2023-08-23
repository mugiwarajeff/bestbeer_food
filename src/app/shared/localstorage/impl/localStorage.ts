import IStorageService from "../interfaces/IStorageService";
import { set, get, clear } from "local-storage";

export class LocalStorage implements IStorageService {
    private accessTokenKey = "accessToken";
    private refreshTokenKey = "refreshToken";

    public  saveAccessToken(accessToken: string): void {
        set<string>(this.accessTokenKey, accessToken);
    }
    public  saveRefreshToken(refreshToken: string): void {
        set<string>(this.refreshTokenKey, refreshToken);
    }
    public  getAccessToken(): string {
        const accessToken:string = get(this.accessTokenKey);
        return accessToken;
    }
    public getRefreshToken(): string {
        const refreshToken: string = get(this.refreshTokenKey);
        return refreshToken;
    }

    clearStorage(): void {
        clear();
    }
}