import { useRecoilValue } from "recoil";
import { productsState } from "../states/ProductState";
import { IProduct } from "../interfaces/IProduct";

export default function useProductsValue(): IProduct[] {
    const products = useRecoilValue(productsState);
    return products;
}