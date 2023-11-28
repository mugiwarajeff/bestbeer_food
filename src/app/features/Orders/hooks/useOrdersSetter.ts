import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { IOrder } from "../interfaces/IOrder";
import { ordersState } from "../state/ordersState";

export function useSetOrders(): SetterOrUpdater<IOrder[]>{

    const stateSetter = useSetRecoilState(ordersState);
    return stateSetter;
}