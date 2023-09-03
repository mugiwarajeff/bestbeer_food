import IStorageService from "../localstorage/interfaces/IStorageService";
import axios from "axios";
import { IRefreshTokenService } from "./interface/IRefreshTokenService";
import { APIENDOPOINT } from "../constants/apiEndpoint";
import { HttpException } from "../exceptions/httpException";

export class AxiosRefreshTokenService implements IRefreshTokenService{
    private axios;
    private localStorage;

    constructor(localStorage: IStorageService){
        this.axios = axios.create({
            baseURL: APIENDOPOINT,
            headers: {"Content-Type": "Application/json"},
        });

        this.localStorage = localStorage;

    }

    public async refreshToken(): Promise<string>{
        const refreshToken: string = this.localStorage.getRefreshToken();

        const response: Response = await axios.post(
            "/login/refresh", 
            {refreshToken: refreshToken});
        
        if(response.status === 200 || response.status === 201){
            console.log(response.body);
            return "";
        }

        throw new HttpException();
    }
}