import { AxiosInstance, AxiosResponse } from "axios";
import { IOrder } from "../interfaces/IOrder";
import { IOrderService } from "../interfaces/IOrderService";
import AxiosService from "app/shared/services/axiosService";
import { CreateOrderDto } from "./dto/CreateOrderDto";
import { IOrderItem } from "../interfaces/IOrderItem";

export class AxiosOrderService implements IOrderService {
    private axiosInstance: AxiosInstance;
    constructor(){
        this.axiosInstance = AxiosService.getInstance();
    }

    public async createOrderItem(orderId: number, quantity: number, productId: number): Promise<IOrderItem>{
        const response: AxiosResponse = await this.axiosInstance.post("/orderItem", {
            productId: productId,
            quantity: quantity,
            orderId: orderId
        });

        const orderItem: IOrderItem = response.data;

        return orderItem;

    }
    public async getOrder(id: number): Promise<IOrder> {
        const response: AxiosResponse = await this.axiosInstance.get("/orders/" + id);
        const order: IOrder = response.data;

        return order;
    }   

    public async createOrder(order: CreateOrderDto): Promise<IOrder>{        
        const response: AxiosResponse = await this.axiosInstance.post("/orders", {
            description: order.description,
            status: order.status,
            deskId: +order.deskId
        } );
        const newOrder: IOrder = response.data;
        return newOrder;
    }
    public async getOrders(): Promise<IOrder[]>{
        const response: AxiosResponse = await this.axiosInstance.get("/orders");
        const orders: IOrder[] = response.data;

        return orders;
    }

}