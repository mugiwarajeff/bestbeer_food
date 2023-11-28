
import { IOrder } from "../../interfaces/IOrder";
import { IOrderItem } from "../../interfaces/IOrderItem";
import styles from "./OrderDetailItens.module.scss";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import useProductsValue from "app/features/Products/hooks/UseProductValue";
import { useEffect } from "react";
import { IOrderService } from "../../interfaces/IOrderService";

interface OrderDetailItens {
    order: IOrder
    onDelete: (id: number) => void
}

export default function OrderDetailItens({ order, onDelete }: OrderDetailItens) {
    console.log(order);
    const itens: IOrderItem[] = order.itens ?? [];
    console.log(order);
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
                    console.log(item.quantity);
                    return <tr key={item.id}>
                        <td>
                            {products.find((product) => product.id === item.productId)?.name}
                        </td>
                        <td>
                            {item.quantity}
                        </td>
                        <td>
                            <div className={styles.iconsContainer}>
                                <AiOutlineEdit
                                    size={40}
                                />
                                <AiOutlineClose size={40} color="red" onClick={() => onDelete(item.id)} />
                            </div>
                        </td>
                    </tr>;
                }) : <div></div>
                }
            </tbody>
        </table>
    </div >;
}