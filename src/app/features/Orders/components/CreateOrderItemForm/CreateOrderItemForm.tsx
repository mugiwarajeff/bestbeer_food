
import { IOrderService } from "../../interfaces/IOrderService";

import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import FormInput from "app/shared/components/Form/FormInput/FormInput";
import FormSelecion from "app/shared/components/Form/FormSelection/FormSelecion";
import Form from "app/shared/components/Form/Form";
import { IProduct } from "app/features/Products/interfaces/IProduct";

import useProductsValue from "app/features/Products/hooks/UseProductValue";
import { IStock } from "app/features/Stocks/interfaces/IStock";

import { IOrder } from "../../interfaces/IOrder";
import { IOrderItem } from "../../interfaces/IOrderItem";
import { StockService } from "app/features/Stocks/interfaces/StockService";
import { useStocks } from "app/features/Stocks/hooks/UseStocks";
import { useOrders } from "../../hooks/useOrders";

interface CreateOrderItemForm {
    isOpen: boolean,
    order?: IOrder,
    setOrder: React.Dispatch<React.SetStateAction<IOrder>>,
    onClose: () => void,
    ordersServiceInstance: IOrderService;
    stockServiceInstance: StockService
}

interface FormProps {
    productName?: string,
    quantity?: number,
}

export default function CreateOrderItemForm(props: CreateOrderItemForm) {

    const ordersService: IOrderService = props.ordersServiceInstance;
    const stockService: StockService = props.stockServiceInstance;
    const product: IProduct[] = useProductsValue();
    const [stocks, setStock] = useStocks();
    const [order, setOrders] = useOrders();
    const { handleSubmit, formState: { errors, }, control, reset } = useForm({ mode: "onChange" });

    useEffect(() => { reset(); }, [props.isOpen]);


    const onSubmit = async (data: FormProps) => {
        console.log(data);
        const productId: number = product.find((product: IProduct) => product.name === data.productName)?.id ?? 0;
        const stock: IStock = stocks.find((stock: IStock) => stock.productId === productId)!;

        if (stock.quantity < data.quantity!) {
            alert("Quantidade em estoque menor que o solicitado!");
        } else {

            const orderItem: IOrderItem = await ordersService.createOrderItem(
                +props.order!.id, +data.quantity!, +productId);

            if (props.order?.itens === undefined) {
                props.order!.itens = [];
            }

            props.order?.itens.push(orderItem);
            props.order!.status = "Em andamento";
            props.setOrder(props.order!);

            const updatedOrder: IOrder = await ordersService.updateOrder(props.order!);

            if (updatedOrder !== undefined) {
                setOrders(order.map(order => {
                    if (order.id === updatedOrder.id) {
                        order = updatedOrder;
                    }

                    return order;
                }));
            }



            const updatedStock: IStock = await stockService.updateStock({
                id: stock.id,
                quantity: stock.quantity - +data.quantity!,
                productId: stock.productId
            });

            setStock(stocks.map(stock => {
                if (stock.id === updatedStock.id) {
                    stock = updatedStock;
                }

                return stock;
            }));
        }
        props.onClose();
    };

    return <Form
        isOpen={props.isOpen}
        title={"Adicionar Item"}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={props.onClose}>
        <Controller
            control={control}
            name="productName"
            defaultValue={product[0]?.name ?? ""}
            render={({ field: { value, onChange } }) => (
                <FormSelecion
                    name="Produto"
                    onChange={onChange}
                    value={value}
                    errorState={errors.productName}
                    values={product.map((product: IProduct) => product.name)}
                />
            )}
        />
        <Controller
            control={control}
            name="quantity"
            defaultValue={""}
            rules={{ required: { value: true, message: "Campo Obrigatório*" } }}
            render={({ field: { value, onChange } }) => (
                <FormInput
                    name={"Quantidade"}
                    type="number"
                    value={value}
                    onChange={onChange}
                    errorState={errors.quantity} />
            )}
        />
    </Form>;
}