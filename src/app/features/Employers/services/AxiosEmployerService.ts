import { AxiosInstance, AxiosResponse } from "axios";
import { IEmpoyersService } from "../interfaces/IEmployersService";
import { IEmployer } from "../interfaces/IEmployer";
import AxiosService from "app/shared/services/axiosService";

export default class AxiosEmployerService implements IEmpoyersService {
    private axios : AxiosInstance;

    constructor(){
        this.axios = AxiosService.getInstance();
    }

    public async getAllEmployers(): Promise<IEmployer[]> {   
        try {
            const response: AxiosResponse = await this.axios.get("users");
            const employers: IEmployer[] = response.data;
            return employers;
        } catch (error) {
            return [];
        }
    }

    deleteEmployer(id: number): Promise<IEmployer | undefined> {
        throw new Error("Method not implemented.");
    }
    updateEmployer(employer: IEmployer): Promise<IEmployer | undefined> {
        throw new Error("Method not implemented.");
    }
    createEmployer(employer: { description: string; available: boolean; }): Promise<IEmployer | undefined> {
        throw new Error("Method not implemented.");
    }
}