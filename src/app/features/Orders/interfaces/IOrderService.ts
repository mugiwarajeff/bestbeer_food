import { IOrder } from "./IOrder";

export interface IOrderService {
    createOrder: (IOrder: IOrder) => Promise<IOrder>
    getOrders: () => Promise<IOrder[]>
}
