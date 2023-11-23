import { useRecoilValue } from "recoil";
import { IStock } from "../interfaces/IStock";
import { stockState } from "../states/StocksState";

export default function UseStocksValue(): IStock[] {

    const stocks: IStock[] = useRecoilValue(stockState);
    return stocks;
}