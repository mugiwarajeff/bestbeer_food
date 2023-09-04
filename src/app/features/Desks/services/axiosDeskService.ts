import { APIENDOPOINT } from "app/shared/constants/apiEndpoint";
import { IDesk } from "../interfaces/IDesk";
import { IDeskService } from "../interfaces/IDeskService";
import axios, { AxiosError, AxiosResponse } from "axios";
import IStorageService from "app/shared/localstorage/interfaces/IStorageService";
import { IRefreshTokenService } from "app/shared/services/interface/IRefreshTokenService";

export class AxiosDeskService implements IDeskService {
    private axios;
    private localStorage: IStorageService;
    private refreshTokenService: IRefreshTokenService;


    constructor(localStorage: IStorageService, refreshTokenService: IRefreshTokenService) {
        this.localStorage = localStorage;
        this.refreshTokenService = refreshTokenService;

        this.axios = axios.create({
            baseURL: APIENDOPOINT,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getAccessToken()}`
            }
        });

        this.axios.interceptors.response.use((response: AxiosResponse) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config;
                const responseStatusCode = error.response?.status;

                if (responseStatusCode === 401 && originalRequest !== undefined) {
                    console.log("token invalido... obtendo novo token");

                    const refreshToken: string = this.localStorage.getRefreshToken();
                    const newAccessToken = await this.refreshTokenService.refreshToken(refreshToken);
                    this.localStorage.saveAccessToken(newAccessToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return this.axios(originalRequest);
                }
            });
    }

    public async getAllDesks(): Promise<IDesk[]> {
        const response: AxiosResponse = await this.axios.get("desks");

        console.log(response.data);

        const desks: IDesk[] = response.data;
        return desks;
    }

    deleteDesk(id: number): Promise<IDesk> {
        throw new Error("Method not implemented.");
    }
    updateDesk(desk: IDesk): Promise<IDesk> {
        throw new Error("Method not implemented.");
    }
    create(desk: IDesk): Promise<IDesk> {
        throw new Error("Method not implemented.");
    }


}