import { IOrder } from "../../interfaces/IOrder";
import { IOrderItem } from "../../interfaces/IOrderItem";

interface OrderDetailItens {
    order ?: IOrder
}

export default function OrderDetailItens({ order }: OrderDetailItens){

    return order === undefined ? <div> </div> : <div>
        <ul>
            
        { order.items  === undefined ? <div></div> : order.items.map( (item: IOrderItem) => <li key={item.id}> {item.id} </li>)}
        </ul>
        
    </div>;
}