import { IStock } from "./IStock";

export interface StockService {
    getStock: () => Promise<IStock[]>
    updateStock: (stock: IStock) => Promise<IStock>
}