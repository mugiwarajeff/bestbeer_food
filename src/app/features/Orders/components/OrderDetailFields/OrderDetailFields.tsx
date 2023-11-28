import FormInput from "app/shared/components/Form/FormInput/FormInput";
import { IOrder } from "../../interfaces/IOrder";
import styles from "./OrderDetailFields.module.scss";
import useProductsValue from "app/features/Products/hooks/UseProductValue";

interface OrderDetailFieldsProps {
    order?: IOrder;
}

export default function OrderDetailFields({ order }: OrderDetailFieldsProps) {
    const products = useProductsValue();
    let valorTotal = 0;

    order?.itens.forEach(orderItem => {
        const myProduct = products.find(product => product.id === orderItem.productId);
        valorTotal += (myProduct?.price ?? 0) * orderItem.quantity;
    });

    return order === undefined ? <div></div> : <div className={styles.orderDetailFields}>
        <FormInput name={"Id"} value={order.id} onChange={undefined} readonly={true} />
        <FormInput name={"Status"} value={order.status} onChange={undefined} readonly={true} />
        <FormInput name={"Descrição"} value={order.description} onChange={undefined} readonly={true} />
        <FormInput name={"Mesa"} value={order.deskId} onChange={undefined} readonly={true} />
        <FormInput name={"Valor Total"} value={`R$ ${valorTotal}`} onChange={undefined} readonly={true} />
    </div>;
}