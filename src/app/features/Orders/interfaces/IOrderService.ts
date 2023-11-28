import { CreateOrderDto } from "../services/dto/CreateOrderDto";
import { IOrder } from "./IOrder";
import { IOrderItem } from "./IOrderItem";

export interface IOrderService {
    createOrder: (IOrder: CreateOrderDto) => Promise<IOrder>;
    createOrderItem: (orderId: number, quantity: number, productId: number) => Promise<IOrderItem>;
    updateOrderItem: (orderItemId: number, quantity: number) => Promise<IOrderItem>
    deleteOrderItem: (id: number) => Promise<IOrderItem>
    getOrders: () => Promise<IOrder[]>;
    getOrder: (id: number) => Promise<IOrder>;
    updateOrder: (order: IOrder) => Promise<IOrder>;
}
