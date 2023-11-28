import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { productsState } from "../states/ProductState";
import { IProduct } from "../interfaces/IProduct";

export default function useSetProducts(): SetterOrUpdater<IProduct[]> {
    const products = useSetRecoilState(productsState);
    return products;
}
