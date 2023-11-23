import { AxiosInstance, AxiosResponse } from "axios";
import { IStock } from "../interfaces/IStock";
import { StockService } from "../interfaces/StockService";
import AxiosService from "app/shared/services/axiosService";

export class AxiosStockService implements StockService {

    private axios: AxiosInstance;

    constructor() {
        this.axios = AxiosService.getInstance();
    }

    public async getStock(): Promise<IStock[]> {
        const response: AxiosResponse = await this.axios.get("/stocks");
        const stocks: IStock[] = response.data;
        return stocks;
    }

    public async updateStock(stock: IStock): Promise<IStock> {
        const response: AxiosResponse = await this.axios.put(`/stocks/${stock.id}`, { quantity: stock.quantity });
        const updatedStock: IStock = response.data;

        return updatedStock;
    }

}