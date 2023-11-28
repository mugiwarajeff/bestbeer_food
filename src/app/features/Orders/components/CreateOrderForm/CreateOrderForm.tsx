import Form from "app/shared/components/Form/Form";
import { IOrderService } from "../../interfaces/IOrderService";
import { useOrders } from "../../hooks/useOrders";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import FormInput from "app/shared/components/Form/FormInput/FormInput";
import FormSelecion from "app/shared/components/Form/FormSelection/FormSelecion";
import { IProductService } from "app/features/Products/interfaces/IProductService";
import useProductsValue from "app/features/Products/hooks/UseProductValue";
import { IProduct } from "app/features/Products/interfaces/IProduct";
import useDesksStateValue from "app/features/Desks/hooks/useDeskStateValue";
import { IDesk } from "app/features/Desks/interfaces/IDesk";
import { useAvailableDesks } from "app/features/Desks/hooks/useAvailableDesks";

interface CreateProductForm {
    isOpen: boolean,
    onClose: () => void,
    ordersServiceInstance: IOrderService;
}

interface FormProps {
    status?: string,
    deskId?: number,
    description?: string
}



export default function CreateOrderForm(props: CreateProductForm){

    const ordersService: IOrderService = props.ordersServiceInstance;

    const [orders, setOrders] = useOrders();
    const desks: IDesk[] = useAvailableDesks();
    const { handleSubmit, formState: { errors, }, control, reset } = useForm({ mode: "onChange" });

    useEffect(() => { reset(); }, [props.isOpen]);


    const onSubmit = async (data: FormProps) => {
        console.log(data);
        const newOrder = await ordersService.createOrder(
            {
                deskId: data.deskId ?? 0,
                status: "Inicial",
                description: data.description ?? "",
            });

        if (newOrder !== undefined) {
            setOrders([...orders, newOrder]);
        }

        props.onClose();
    };

    return <Form
        isOpen={props.isOpen}
        title={"Criar Pedido"}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={props.onClose}>
        <Controller
            control={control}
            name="deskId"
            defaultValue={""}
            rules={{ required: { value: true, message: "Campo Obrigatório" }, }}
            render={({ field: { value, onChange } }) => (
                <FormSelecion 
                    name="Número da mesa"
                    onChange={onChange}
                    value={value}
                    errorState={errors.deskId}
                    values={desks.map((desk: IDesk) => desk.id)}
                />
            )}
        />
        <Controller
            control={control}
            name="description"
            defaultValue={""}
            render={({ field: { value, onChange } }) => (
                <FormInput
                    name={"Descrição"}
                    //register={{ ...register("user", { required: "*Campo Obrigatório", },) }}
                    value={value}
                    onChange={onChange}
                    errorState={errors.category} />
            )}
        />
    </Form>;
}