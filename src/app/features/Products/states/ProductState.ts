import { atom } from "recoil";
import { IProduct } from "../interfaces/IProduct";

export const productsState = atom<IProduct[]>({
    default: [],
    key: "productsState"
});