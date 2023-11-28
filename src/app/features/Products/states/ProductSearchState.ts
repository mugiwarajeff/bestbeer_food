import { atom } from "recoil";
import { IProduct } from "../interfaces/IProduct";

export const productSearch = atom<string>({
    default: "",
    key: "productSearch"
});