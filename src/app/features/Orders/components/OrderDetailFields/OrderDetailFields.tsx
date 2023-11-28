import FormInput from "app/shared/components/Form/FormInput/FormInput";
import { IOrder } from "../../interfaces/IOrder";
import styles from "./OrderDetailFields.module.scss";

interface OrderDetailFieldsProps {
    order?: IOrder;
}

export default function OrderDetailFields({ order }: OrderDetailFieldsProps) {

    return order === undefined ? <div></div> : <div className={styles.orderDetailFields}>
        <FormInput name={"Id"} value={order.id} onChange={undefined} readonly={true} />
        <FormInput name={"Status"} value={order.status} onChange={undefined} readonly={true} />
        <FormInput name={"Descrição"} value={order.description} onChange={undefined} readonly={true} />
        <FormInput name={"Mesa"} value={order.deskId} onChange={undefined} readonly={true} />
    </div>;
}