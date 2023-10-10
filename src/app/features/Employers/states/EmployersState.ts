import { atom } from "recoil";
import { IEmployer } from "../interfaces/IEmployer";

export const employersState = atom<IEmployer[]>(
    {
        default: [{cpf: "", email: "", id: 0, name: "", password: "", role: "", telefone: "", user: ""}],
        key: "employersState"
    }
);