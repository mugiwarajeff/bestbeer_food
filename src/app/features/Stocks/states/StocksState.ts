import { atom } from "recoil";
import { IStock } from "../interfaces/IStock";

export const stockState = atom<IStock[]>({
    default: [],
    key: "stocksState"
});