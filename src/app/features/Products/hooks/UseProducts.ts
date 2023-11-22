import { SetterOrUpdater, useRecoilState } from "recoil";
import { IProduct } from "../interfaces/IProduct";
import { productsState } from "../states/ProductState";

export default function useProducts(): [IProduct[], SetterOrUpdater<IProduct[]>] {

    const products = useRecoilState(productsState);
    return products;
}