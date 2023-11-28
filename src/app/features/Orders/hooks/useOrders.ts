import { SetterOrUpdater, useRecoilState } from "recoil";
import { IOrder } from "../interfaces/IOrder";
import { ordersState } from "../state/ordersState";

export function useOrders(): [IOrder[], SetterOrUpdater<IOrder[]>]{

    const states = useRecoilState(ordersState);
    return states;
}