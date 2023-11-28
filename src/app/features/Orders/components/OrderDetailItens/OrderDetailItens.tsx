
import { IOrder } from "../../interfaces/IOrder";
import { IOrderItem } from "../../interfaces/IOrderItem";
import styles from "./OrderDetailItens.module.scss";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import useProductsValue from "app/features/Products/hooks/UseProductValue";
import { useEffect } from "react";
import { IOrderService } from "../../interfaces/IOrderService";
import OrderDetailItemRow from "./OrderDetailItemRow";
import { StockService } from "app/features/Stocks/interfaces/StockService";

interface OrderDetailItens {
    order: IOrder
    onDelete: (id: number) => void
    ordersService: IOrderService,
    stockService: StockService
}

export default function OrderDetailItens({ order, onDelete, ordersService, stockService }: OrderDetailItens) {
    const itens: IOrderItem[] = order.itens ?? [];
    const products = useProductsValue();
    const typeProperties = itens.length > 0 ? Object.keys(itens[0]) : [];
    typeProperties.shift();
    console.log(order?.itens);




    return <div className={styles.orderDetailsTable}>
        <table>
            <thead>
                <tr>
                    <td>
                        Item do Pedido
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
                {itens.length > 0 ? itens.map((item) => {

                    return <OrderDetailItemRow
                        orderFinalized={order.status === "Finalizado"}
                        key={item.id}
                        orderItem={item}
                        orderService={ordersService}
                        stockService={stockService} />;
                }) : <div></div>
                }
            </tbody>
        </table>
    </div >;
}