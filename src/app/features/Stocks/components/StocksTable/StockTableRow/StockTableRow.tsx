import { IStock } from "app/features/Stocks/interfaces/IStock";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import styles from "./StockTableRow.module.scss";
import { StockService } from "app/features/Stocks/interfaces/StockService";
import { useStocks } from "app/features/Stocks/hooks/UseStocks";
import useProductsValue from "app/features/Products/hooks/UseProductValue";

interface StockTableRowProps {
    stock: IStock,
    stockService: StockService
}

export default function StockTableRow({ stock, stockService }: StockTableRowProps) {
    const products = useProductsValue();
    const [stocks, setStocks] = useStocks();
    const [value, setValue] = useState<string>("");
    const [editing, setEditing] = useState<boolean>(false);

    useEffect(() => {
        setValue(stock.quantity.toString());
    }, [location.href]);


    const onEdit = () => {
        setEditing(true);
    };

    const onSave = async () => {

        if (!Number.isInteger(+value)) {
            setValue(stock.quantity.toString());
        }

        if (+value !== stock.quantity && Number.isInteger(+value)) {
            const updatedStock: IStock = await stockService.updateStock({ id: stock.id, productId: stock.productId, quantity: +value });

            setStocks(stocks.map(stock => {
                if (stock.id === updatedStock.id) {
                    stock = updatedStock;
                }

                return stock;
            }));
        }
        setEditing(false);
    };

    return <tr key={stock.id}>
        <td>
            {products.find((product) => product.id === stock.productId)?.name}
        </td>
        <td>
            <input
                type="text"
                value={value}
                readOnly={!editing}
                onChange={event => setValue(event.target.value)} />
        </td>
        <td>
            <div className={styles.iconsContainer}>
                <FaSave
                    size={40}
                    onClick={onSave}
                    style={{ display: !editing ? "none" : "block" }} />
                <AiOutlineEdit
                    size={40}
                    onClick={onEdit}
                    style={{ display: editing ? "none" : "block" }} />

            </div>
        </td>
    </tr>;
}