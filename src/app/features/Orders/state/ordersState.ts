import { atom } from "recoil";
import { IOrder } from "../interfaces/IOrder";

export const ordersState = atom<IOrder[]>({
    default: [],
    key: "ordersState"
});