import { IOrderItem } from "./IOrderItem";

export interface IOrder {
    id: number,
    status: string,
    description: string
    deskId: number,
    itens: IOrderItem[]
}