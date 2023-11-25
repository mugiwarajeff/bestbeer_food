import { AxiosInstance } from "axios";
import { IOrder } from "../interfaces/IOrder";
import { IOrderService } from "../interfaces/IOrderService";
import AxiosService from "app/shared/services/axiosService";

export class AxiosOrderService implements IOrderService {
    private axiosInstance: AxiosInstance;
    constructor(){
        this.axiosInstance = AxiosService.getInstance();
    }

    public async createOrder(order: IOrder): Promise<IOrder>{
        const newOrder: IOrder = await this.axiosInstance.post("/orders", {
            status: order.status,
            description: order.description,
            deskId: order.deskId
        });

        return newOrder;
    }
    public async getOrders(): Promise<IOrder[]>{
        const orders: IOrder[] = await this.axiosInstance.get("/orders");
        return orders;
    }

}