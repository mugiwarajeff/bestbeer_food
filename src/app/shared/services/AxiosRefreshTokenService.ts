import axios, { AxiosError, AxiosResponse } from "axios";
import { IRefreshTokenService } from "./interface/IRefreshTokenService";
import { APIENDOPOINT } from "../constants/apiEndpoint";
import { HttpException } from "../exceptions/httpException";
import { UnauthorizedException } from "../exceptions/unauthorizedException";
import { redirect } from "react-router-dom";

export class AxiosRefreshTokenService implements IRefreshTokenService {
    private axios;

    constructor() {
        this.axios = axios.create({
            baseURL: APIENDOPOINT,
            headers: { "Content-Type": "application/json" },
        });


        this.axios.interceptors.response.use(response => response, (error: AxiosError) => {

            if (error.response?.status === 401) {
                console.log("caiu no redirect");
                alert("Login invalido... por favor realize novo login");

                redirect("login");
                console.log(error.response.status);
            }


        });
    }

    public async refreshToken(refreshToken: string): Promise<string> {

        const response: AxiosResponse = await this.axios.post(
            "login/refresh",
            { refreshToken: refreshToken });

        if (response.status === 200 || response.status === 201) {

            const newAccessToken = response.data["acess_token"];
            return newAccessToken;
        }

        if (response.status === 401) {
            throw new UnauthorizedException();
        }


        throw new HttpException();
    }
}