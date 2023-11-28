import SearchBar from "app/shared/components/SearchBar/SearchBar";
import styles from "./Stock.module.scss";
import StocksTable from "./components/StocksTable/StocksTable";
import { StockService } from "./interfaces/StockService";
import { AxiosStockService } from "./services/AxiosStockService";
import { useEffect } from "react";
import { useSetStocks } from "./hooks/UseSetStocks";
import { IProductService } from "../Products/interfaces/IProductService";
import AxiosProductService from "../Products/services/AxiosProductService";
import useSetProducts from "../Products/hooks/UseSetProducts";


export default function Stocks() {
    const stocksService: StockService = new AxiosStockService();
    const productService: IProductService = new AxiosProductService();
    const setStocks = useSetStocks();
    const setProduct = useSetProducts();

    useEffect(() => {
        stocksService.getStock().then((newStocks) => {
            setStocks(newStocks);
        });

        productService.getProducts().then(products => setProduct(products));
    }, []);


    const placeHolder = "Pesquise seus produtos em estoque";

    return <section className={styles.stock}>
        <SearchBar placeHolder={placeHolder} value={""} setValue={function (valOrUpdater: string | ((currVal: string) => string)): void {
            throw new Error("Function not implemented.");
        }} />
        <StocksTable stocksServiceInstance={stocksService} />
    </section>;
}