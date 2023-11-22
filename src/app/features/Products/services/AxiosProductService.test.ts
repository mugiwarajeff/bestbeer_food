// eslint-disable-next-line @typescript-eslint/no-var-requires
import axios from "axios";
import { IProduct } from "../interfaces/IProduct";
import { IProductService } from "../interfaces/IProductService";

import AxiosProductService from "./AxiosProductService";



describe("Should test the AxiosProductService", () => {
    const productService: IProductService = new AxiosProductService();
    jest.mock("axios");

    it("should get all products", async () => {
        // Configurando o mock para retornar dados fictícios
        (axios.get as jest.Mock).mockResolvedValue({
            id: 1,
            name: "Agua",
            description: "",
            category: "Bebidas",
            price: "4.2"
        });

        const products: IProduct[] = await productService.getProducts();

        console.log(products);
    });
}
);