import { APIENDOPOINT } from "app/shared/constants/apiEndpoint";
import { IDesk } from "../interfaces/IDesk";
import { IDeskService } from "../interfaces/IDeskService";
import axios, { AxiosError, AxiosResponse } from "axios";
import { redirect } from "react-router-dom";
import IStorageService from "app/shared/localstorage/interfaces/IStorageService";
import { LocalStorage } from "app/shared/localstorage/impl/localStorage";

export class AxiosDeskService implements IDeskService {
    private axios;
    private localStorage: IStorageService;

    constructor(localStorage: IStorageService){
        this.localStorage = localStorage;

        this.axios = axios.create({
            baseURL: APIENDOPOINT , 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getAccessToken()}` 
            }
        });

        axios.interceptors.response.use((response: AxiosResponse) => {

            return response;
        }, (error: AxiosError) => {
            const originalRequest = error.config;

            
            //TODO fazer retry de requisição
            
            console.log(error.response?.status);
            
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