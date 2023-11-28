import Form from "app/shared/components/Form/Form";
import { IOrderService } from "../../interfaces/IOrderService";
import { useOrders } from "../../hooks/useOrders";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import FormInput from "app/shared/components/Form/FormInput/FormInput";
import FormSelecion from "app/shared/components/Form/FormSelection/FormSelecion";
import { IDesk } from "app/features/Desks/interfaces/IDesk";
import { useAvailableDesks } from "app/features/Desks/hooks/useAvailableDesks";
import { IDeskService } from "app/features/Desks/interfaces/IDeskService";
import useDeksState from "app/features/Desks/hooks/useDeskState";

interface CreateProductForm {
    isOpen: boolean,
    onClose: () => void,
    ordersServiceInstance: IOrderService,
    desksServiceInstance: IDeskService
}

interface FormProps {
    status?: string,
    deskId?: string,
    description?: string
}



export default function CreateOrderForm(props: CreateProductForm) {
    const ordersService: IOrderService = props.ordersServiceInstance;
    const desksService: IDeskService = props.desksServiceInstance;
    const [orders, setOrders] = useOrders();
    const desksAvailables: IDesk[] = useAvailableDesks();
    const [desks, setDesks] = useDeksState();
    const { handleSubmit, formState: { errors, }, control, reset } = useForm({ mode: "onChange" });

    useEffect(() => { reset(); }, [props.isOpen]);


    const onSubmit = async (data: FormProps) => {

        const selectedDesk: IDesk | undefined = desks.find(desk => desk.id === Number.parseInt(data.deskId ?? ""));
        const newOrder = await ordersService.createOrder(
            {
                deskId: Number.parseInt(data.deskId ?? ""),
                status: "Inicial",
                description: data.description ?? "",
            });

        if (newOrder !== undefined && selectedDesk !== undefined) {
            setOrders([...orders, newOrder]);
            console.log(selectedDesk.description ?? "");
            const updatedDesk: IDesk | undefined = await desksService.updateDesk({ available: false, description: selectedDesk.description, id: selectedDesk.id });
            if (updatedDesk !== undefined) {
                setDesks(desks.map(desk => {
                    if (desk.id === updatedDesk.id) {
                        desk = updatedDesk;
                    }

                    return desk;
                }));
            }
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
            defaultValue={desksAvailables[0]?.id ?? 0}
            rules={{ required: { value: true, message: "Campo Obrigatório" }, }}
            render={({ field: { value, onChange } }) => (
                <FormSelecion
                    name="Número da mesa"
                    onChange={onChange}
                    value={value}
                    errorState={errors.deskId}
                    values={desksAvailables.map((desk: IDesk) => desk.id)}
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
                    errorState={errors.description} />
            )}
        />
    </Form>;
}