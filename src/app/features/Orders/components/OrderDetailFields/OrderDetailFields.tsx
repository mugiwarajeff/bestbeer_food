import { IOrder } from "../../interfaces/IOrder";

interface OrderDetailFieldsProps {
    order?: IOrder;
}

export default function OrderDetailFields({order}: OrderDetailFieldsProps){

    return order === undefined ? <div></div> : <div>
    
        <input type="text" readOnly={true} value={order.id} name="id" />
        <input type="text" readOnly={true} value={order.status} name="status" />
        <input type="text" readOnly={true} value={order.description} name="description" />
        <input type="text" readOnly={true} value={order.deskId} name="deskid" />
        
    </div>;
}