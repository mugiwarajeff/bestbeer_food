
import UseStocksValue from "../../hooks/UseStocksValue";
import { StockService } from "../../interfaces/StockService";
import styles from "./StocksTable.module.scss";
import StockTableRow from "./StockTableRow/StockTableRow";


interface TableProps {

    stocksServiceInstance: StockService
}
export default function StocksTable(props: TableProps) {
    const stocks = UseStocksValue();

    const typeProperties = stocks.length > 0 ? Object.keys(stocks[0]) : [];
    typeProperties.shift();

    return <div className={styles.stocksTable}>
        <table>
            <thead>
                <tr>
                    <td>
                        Produto
                    </td>
                    <td>
                        Quantidade
                    </td>
                    <th>
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody>
                {stocks.length > 0 ? stocks.map((stock) => <StockTableRow
                    key={stock.id}
                    stock={stock}
                    stockService={props.stocksServiceInstance} />) : <div></div>
                }
            </tbody>
        </table>
    </div >;

}