import { AxiosInstance, AxiosResponse } from "axios";
import { IEmpoyersService } from "../interfaces/IEmployersService";
import { IEmployer } from "../interfaces/IEmployer";
import AxiosService from "app/shared/services/axiosService";
import CreateUserDto from "./dto/CreateUserDto";

export default class AxiosEmployerService implements IEmpoyersService {
    private axios: AxiosInstance;

    constructor() {
        this.axios = AxiosService.getInstance();
    }

    public async getAllEmployers(): Promise<IEmployer[]> {
        try {
            const response: AxiosResponse = await this.axios.get("users");
            const employers: IEmployer[] = response.data;
            console.log(employers);
            console.log(response.data);
            return employers;
        } catch (error) {
            return [];
        }
    }

    public async deleteEmployer(id: number): Promise<IEmployer | undefined> {
        try {
            const response: AxiosResponse = await this.axios.delete(`users/${id}`);
            const deletedEmployer: IEmployer = response.data;

            return deletedEmployer;
        } catch (error) {
            alert("erro ao deletar usuario");
        }
    }

    public async updateEmployer(employer: IEmployer): Promise<IEmployer | undefined> {
        try {
            const response: AxiosResponse = await this.axios.put(`users/${employer.id}`, {
                user: employer.user,
                name: employer.name,
                cpf: employer.cpf,
                telefone: employer.telefone,
                email: employer.email,
                role: employer.role,
                password: employer.password
            });

            const updatedEmployer: IEmployer = response.data;

            return updatedEmployer;
        } catch (error) {
            alert("erro ao atualizar usuario");
        }
    }

    public async createEmployer(employer: CreateUserDto): Promise<IEmployer | undefined> {
        try {
            console.log(employer);
            const response: AxiosResponse = await this.axios.post("users", employer);
            if (response.status === 201 || response.status === 200) {
                const createdEmployer: IEmployer = response.data;
                return createdEmployer;
            }
        } catch (error) {
            alert("Erro ao criar novo Funcionário");
            console.log(error);
        }
    }
}