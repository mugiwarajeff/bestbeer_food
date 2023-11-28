import { CreateOrderDto } from "../services/dto/CreateOrderDto";
import { IOrder } from "./IOrder";
import { IOrderItem } from "./IOrderItem";

export interface IOrderService {
    createOrder: (IOrder: CreateOrderDto) => Promise<IOrder>
    createOrderItem: (orderId: number, quantity: number, productId: number) => Promise<IOrderItem>
    getOrders: () => Promise<IOrder[]>
    getOrder: (id: number) => Promise<IOrder>;
}
