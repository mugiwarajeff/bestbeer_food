import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { stockState } from "../states/StocksState";
import { IStock } from "../interfaces/IStock";

export function useSetStocks(): SetterOrUpdater<IStock[]> {

    const setStock = useSetRecoilState(stockState);

    return setStock;
}