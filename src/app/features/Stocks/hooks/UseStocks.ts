import { SetterOrUpdater, useRecoilState } from "recoil";
import { stockState } from "../states/StocksState";
import { IStock } from "../interfaces/IStock";

export function useStocks(): [IStock[], SetterOrUpdater<IStock[]>] {

    const stocksRecoilState = useRecoilState(stockState);
    return stocksRecoilState;
}