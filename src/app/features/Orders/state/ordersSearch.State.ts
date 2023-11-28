import { atom } from "recoil";
import { IOrder } from "../interfaces/IOrder";

export const ordersSearchState = atom<string>({
    default: "",
    key: "ordersSearchState"
});