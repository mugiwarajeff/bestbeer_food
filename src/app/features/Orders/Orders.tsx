import Fab from "app/shared/components/Fab/Fab";
import SearchBar from "app/shared/components/SearchBar/SearchBar";
import styles from "./Orders.module.scss";
import OrdersTable from "./components/OrdersTable/OrdersTable";
import { IOrderService } from "./interfaces/IOrderService";
import { AxiosOrderService } from "./services/AxiosOrderService";
import CreateOrderForm from "./components/CreateOrderForm/CreateOrderForm";
import { useEffect, useState } from "react";
import { IOrder } from "./interfaces/IOrder";
import { useSetOrders } from "./hooks/useOrdersSetter";
import { IDeskService } from "../Desks/interfaces/IDeskService";
import { AxiosDeskService } from "../Desks/services/axiosDeskService";
import useSetDesksState from "../Desks/hooks/useSetDeskState";
import { IDesk } from "../Desks/interfaces/IDesk";
import { useRecoilState, useRecoilValue } from "recoil";
import { ordersSearchState } from "./state/ordersSearch.State";

export default function Orders() {
    const ordersService: IOrderService = new AxiosOrderService();
    const deskService: IDeskService = new AxiosDeskService();

    const setOrders = useSetOrders();
    const setDesks = useSetDesksState();
    const [openCreateForm, setOpenCreateForm] = useState<boolean>(false);
    const placeHolder = "Pesquise seus Pedidos";
    const [search, setSearch] = useRecoilState(ordersSearchState);


    useEffect(() => {
        ordersService.getOrders().then((orders: IOrder[]) => {
            setOrders(orders);
        });

        deskService.getAllDesks().then((desks: IDesk[]) => setDesks(desks));


    }, []);


    return <section className={styles.orders}>
        <SearchBar placeHolder={placeHolder} value={search} setValue={setSearch} />
        <OrdersTable ordersServiceInstance={ordersService} desksServiceInstance={deskService} />
        <Fab onClick={() => {
            setOpenCreateForm(true);
        }} />
        <CreateOrderForm
            desksServiceInstance={deskService}
            isOpen={openCreateForm}
            ordersServiceInstance={ordersService}
            onClose={() => {
                setOpenCreateForm(false);
            }} />
    </section>;
}