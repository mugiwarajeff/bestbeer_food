import { IDesk } from "../interfaces/IDesk";
import { IDeskService } from "../interfaces/IDeskService";
import { AxiosInstance, AxiosResponse } from "axios";
import IStorageService from "app/shared/localstorage/interfaces/IStorageService";
import { IRefreshTokenService } from "app/shared/services/interface/IRefreshTokenService";
import AxiosService from "app/shared/services/axiosService";

export class AxiosDeskService implements IDeskService {
    private axios: AxiosInstance;
    private localStorage: IStorageService;
    private refreshTokenService: IRefreshTokenService;


    constructor(localStorage: IStorageService, refreshTokenService: IRefreshTokenService) {
        this.localStorage = localStorage;
        this.refreshTokenService = refreshTokenService;

        this.axios = AxiosService.getInstance();
    }

    public async getAllDesks(): Promise<IDesk[]> {
        try {
            const response: AxiosResponse = await this.axios.get("desks");
            const desks: IDesk[] = response.data;
            return desks;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async deleteDesk(id: number): Promise<IDesk | undefined> {
        const response: AxiosResponse = await this.axios.delete(`desks/${id}`);
        const deletedDesk: IDesk = response.data;

        console.log(deletedDesk);

        return deletedDesk;
    }

    public async updateDesk(desk: IDesk): Promise<IDesk | undefined> {
        const response: AxiosResponse = await this.axios.put(`desks/${desk.id}`, { "description": desk.description, "available": desk.available });
        const updatedDesk: IDesk = response.data;

        return updatedDesk;
    }

    public async create(desk: IDesk): Promise<IDesk | undefined> {
        try {
            const response: AxiosResponse = await this.axios.post("desks", desk);
            const newDesk: IDesk = response.data;
            return newDesk;
        } catch (error) {
            console.log(error);
            alert("erro ao criar nova mesa");
        }
    }


}