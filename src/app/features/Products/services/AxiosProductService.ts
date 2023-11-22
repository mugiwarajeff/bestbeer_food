import { IProduct } from "../interfaces/IProduct";
import { IProductService } from "../interfaces/IProductService";
import { AxiosInstance, AxiosResponse } from "axios";
import AxiosService from "../../../shared/services/axiosService";

export default class AxiosProductService implements IProductService {
    private axios: AxiosInstance;

    constructor() {
        this.axios = AxiosService.getInstance();
    }


    public async getProducts(): Promise<IProduct[]> {
        const response: AxiosResponse = await this.axios.get("products");
        const products: IProduct[] = response.data;

        return products;
    }

    public async createProduct(product: IProduct): Promise<IProduct> {
        const requestBody = {
            name: product.name,
            category: product.category,
            price: product.price.toString().replaceAll(",", "."),
            description: product.description

        };

        const response: AxiosResponse = await this.axios.post("products", requestBody);
        const createdProduct: IProduct = response.data;

        return createdProduct;
    }

    public async updateProduct(product: IProduct): Promise<IProduct> {
        const [id, productBody] = [product.id,
        {
            name: product.name,
            category: product.category,
            price: product.price.toString().replaceAll(",", "."),
            description: product.description
        }];

        const response: AxiosResponse = await this.axios.put(`products/${id}`, productBody);
        const updatedProduct: IProduct = response.data;

        return updatedProduct;
    }

    public async deleteProduct(product: IProduct): Promise<IProduct> {
        const [id, productBody] = [product.id, { ...product }];
        console.log(id);
        console.log(productBody);

        const response: AxiosResponse = await this.axios.delete(`products/${id}`);
        const deletedProduct: IProduct = response.data;

        return deletedProduct;
    }

}