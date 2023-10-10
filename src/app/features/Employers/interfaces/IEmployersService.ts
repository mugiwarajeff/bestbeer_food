import CreateUserDto from "../services/dto/CreateUserDto";
import { IEmployer } from "./IEmployer";

export interface IEmpoyersService {
    getAllEmployers(): Promise<IEmployer[]>;
    deleteEmployer(id: number): Promise<IEmployer | undefined>;
    updateEmployer(employer: IEmployer): Promise<IEmployer | undefined>;
    createEmployer(employer: CreateUserDto): Promise<IEmployer | undefined>;
}