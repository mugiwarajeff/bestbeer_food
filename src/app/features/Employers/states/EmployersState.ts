import { atom } from "recoil";
import { IEmployer } from "../interfaces/IEmployer";

export const employersState = atom<IEmployer[]>(
    {
        default: [],
        key: "employersState"
    }
);