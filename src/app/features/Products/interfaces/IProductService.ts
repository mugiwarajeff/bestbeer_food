import { IProduct } from "./IProduct";

export interface IProductService {
    getProducts: () => Promise<IProduct[]>,
    createProduct: (product: IProduct) => Promise<IProduct>,
    updateProduct: (product: IProduct) => Promise<IProduct>,
    deleteProduct: (product: IProduct) => Promise<IProduct>
}