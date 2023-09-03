import { atom } from "recoil";
import { IDesk } from "../interfaces/IDesk";

export const desksState = atom<IDesk[]>(
    {
        default: [], 
        key: "desksState"
    });