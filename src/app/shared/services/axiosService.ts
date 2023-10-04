import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { APIENDOPOINT } from "../constants/apiEndpoint";
import IStorageService from "../localstorage/interfaces/IStorageService";
import { LocalStorage } from "../localstorage/impl/localStorage";
import { IRefreshTokenService } from "./interface/IRefreshTokenService";
import { AxiosRefreshTokenService } from "./AxiosRefreshTokenService";

class AxiosService {
    private static localStorage: IStorageService = new LocalStorage();
    private static instance: AxiosInstance;
    private static refreshTokenService: IRefreshTokenService = new AxiosRefreshTokenService();

    //private constructor(){}

    public static getInstance(): AxiosInstance {
        console.log(this.instance);

        if (!this.instance) {
            this.instance = axios.create({
                baseURL: APIENDOPOINT,
                headers: {
                    "Content-Type": "application/json",
                },

            });


            this.instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
                if (request.baseURL?.split("/")[-1] !== "login") {
                    const accessToken = this.localStorage.getAccessToken();
                    request.headers.Authorization = `Bearer ${accessToken}`;
                }
                return request;
            }, (error) => Promise.reject(error));


            this.instance.interceptors.response.use(response => response, async (error: AxiosError) => {
                const originalRequest = error.config;
                const responseStatuscode = error.response?.status;


                if (responseStatuscode === 401 && originalRequest !== undefined) {
                    const refreshToken: string = this.localStorage.getRefreshToken();
                    console.log("token invalido... obtendo novo token");
                    const newAccessToken: string = await this.refreshTokenService.refreshToken(refreshToken);
                    this.localStorage.saveAccessToken(newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return this.instance(originalRequest);
                }
            });
        }

        return this.instance;
    }
}

export default AxiosService;