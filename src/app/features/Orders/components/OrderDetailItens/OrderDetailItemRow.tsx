import { StockService } from "app/features/Stocks/interfaces/StockService";
import { IOrderItem } from "../../interfaces/IOrderItem";
import { IOrderService } from "../../interfaces/IOrderService";
import { useEffect, useState } from "react";
import useProductsValue from "app/features/Products/hooks/UseProductValue";
import { useStocks } from "app/features/Stocks/hooks/UseStocks";
import { FaSave } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import styles from "./OrderDetailItemRow.module.scss";

interface StockTableRowProps {
    orderItem: IOrderItem,
    orderService: IOrderService,
    stockService: StockService,
    orderFinalized: boolean
}

export default function StockTableRow({ orderItem, orderService, stockService, orderFinalized }: StockTableRowProps) {
    const products = useProductsValue();
    const [stocks, setStocks] = useStocks();
    const [value, setValue] = useState<string>("");
    const [editing, setEditing] = useState<boolean>(false);

    useEffect(() => {
        setValue(orderItem.quantity.toString());
    }, [location.href]);


    const onEdit = () => {
        setEditing(true);
    };

    const onSave = async () => {

        if (!Number.isInteger(+value)) {
            setValue(orderItem.quantity.toString());
        }

        if (+value !== orderItem.quantity && Number.isInteger(+value)) {
            const updatedOrderItem: IOrderItem = await orderService.updateOrderItem(orderItem.id, +value);


            if (updatedOrderItem !== undefined) {
                const diference: number = orderItem.quantity - +value;
                const myStock = stocks.find(stock => stock.productId === orderItem.productId);


                const updatedStock = await stockService.updateStock({
                    id: myStock?.id ?? 0,
                    productId: myStock?.productId ?? 0,
                    quantity: (myStock?.quantity ?? 0) + diference
                });

                if (updatedStock !== undefined) {
                    setStocks(stocks.map(stock => {
                        if (stock.id === updatedStock.id) {
                            stock = updatedStock;
                        }

                        return stock;
                    }));
                }
            }
        }
        setEditing(false);
    };

    return <tr key={orderItem.id}>
        <td>
            {products.find((product) => product.id === orderItem.productId)?.name}
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
                    onClick={!orderFinalized ? onEdit : undefined}
                    style={{ display: editing ? "none" : "block" }} />
            </div>
        </td>
    </tr>;
}