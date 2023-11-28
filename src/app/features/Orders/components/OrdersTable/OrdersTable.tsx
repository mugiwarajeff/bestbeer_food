import { AiFillEye, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import styles from "./OrdersTable.module.scss";
import { IOrder } from "../../interfaces/IOrder";
import { IOrderService } from "../../interfaces/IOrderService";
import { useOrders } from "../../hooks/useOrders";
import { Link } from "react-router-dom";
import useDeksState from "app/features/Desks/hooks/useDeskState";
import { IDeskService } from "app/features/Desks/interfaces/IDeskService";

interface TableProps {
    ordersServiceInstance: IOrderService
    desksServiceInstance: IDeskService
}

export default function OrdersTable({ ordersServiceInstance, desksServiceInstance }: TableProps) {
    const [orders, setOrders] = useOrders();
    const [desks, setDesks] = useDeksState();

    const typeProperties = orders.length > 0 ? Object.keys(orders[0]) : [];
    typeProperties.shift();

    const endOrder = async (order: IOrder) => {
        const updatedOrder = await ordersServiceInstance.updateOrder({ ...order, status: "Finalizado" });

        const myDesk = desks.find(desk => desk.id === updatedOrder.deskId);

        if (updatedOrder !== undefined) {
            setOrders(orders.map(order => {
                if (order.id === updatedOrder.id) {
                    order = updatedOrder;
                }

                return order;
            }
            ));

            const updatedDesk = await desksServiceInstance.updateDesk({ available: true, description: myDesk?.description ?? "", id: myDesk?.id ?? 0 });

            if (updatedDesk !== undefined) {
                desks.map(desk => {
                    if (desk.id === updatedDesk.id) {
                        desk = updatedDesk;
                    }

                    return desk;
                });
            }
        }
    };

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
                            <FaCheck size={40} color="green" onClick={() => endOrder(orders)} />

                        </div>
                    </td>
                </tr>) : <div></div>
                }
            </tbody>
        </table>
    </div >;
}