import SearchBar from "app/shared/components/SearchBar/SearchBar";
import styles from "./Stock.module.scss";
import StocksTable from "./components/StocksTable/StocksTable";
import { StockService } from "./interfaces/StockService";
import { AxiosStockService } from "./services/AxiosStockService";
import { useEffect } from "react";
import { useSetStocks } from "./hooks/UseSetStocks";


export default function Stocks() {
    const stocksService: StockService = new AxiosStockService();
    const setStocks = useSetStocks();

    useEffect(() => {
        stocksService.getStock().then((newStocks) => {
            setStocks(newStocks);
        });
    }, []);


    const placeHolder = "Pesquise seus produtos em estoque";

    return <section className={styles.stock}>
        <SearchBar placeHolder={placeHolder} />
        <StocksTable stocksServiceInstance={stocksService} />
    </section>;
}