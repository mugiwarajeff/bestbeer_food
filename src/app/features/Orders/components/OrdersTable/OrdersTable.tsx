import { AiFillEye, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import styles from "./OrdersTable.module.scss";
import { IOrder } from "../../interfaces/IOrder";
import { IOrderService } from "../../interfaces/IOrderService";
import { useOrders } from "../../hooks/useOrders";
import { Link } from "react-router-dom";

interface TableProps {
    ordersServiceInstance: IOrderService
}

export default function OrdersTable({ ordersServiceInstance }: TableProps) {
    const [orders, setOrders] = useOrders();

    const typeProperties = orders.length > 0 ? Object.keys(orders[0]) : [];
    typeProperties.shift();

    return <div className={styles.ordersTable}>
        <table>
            <thead>
                <tr>
                    <td>
                        Numero do Pedido
                    </td>
                    <td>
                        Numero da Mesa
                    </td>
                    <td>
                        Descrição
                    </td>
                    <td>
                        Status
                    </td>
                    <th>
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody>
                {orders.length > 0 ? orders.map((orders) => <tr key={orders.id}>
                    <td>
                        {orders.id}
                    </td>
                    <td>
                        {orders.deskId}
                    </td>
                    <td>
                        {orders.description}
                    </td>
                    <td>
                        {orders.status}
                    </td>
                    <td>
                        <div className={styles.iconsContainer}>
                            <Link to={`details/${orders.id}`}>
                                <AiFillEye size={40} />
                            </Link>
                        </div>
                    </td>
                </tr>) : <div></div>
                }
            </tbody>
        </table>
    </div >;
}