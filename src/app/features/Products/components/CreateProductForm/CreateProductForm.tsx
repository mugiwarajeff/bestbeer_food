import { Controller, useForm } from "react-hook-form";
import useProducts from "../../hooks/UseProducts";
import { IProductService } from "../../interfaces/IProductService";
import Form from "app/shared/components/Form/Form";
import FormInput from "app/shared/components/Form/FormInput/FormInput";
import { useEffect } from "react";

interface CreateProductForm {
    isOpen: boolean,
    onClose: () => void,
    productServiceInstance: IProductService;
}

interface FormProps {
    name?: string,
    category?: string,
    price?: number,
    description?: string
}


export default function CreateProductForm(props: CreateProductForm) {

    const productService: IProductService = props.productServiceInstance;

    const [products, setProducts] = useProducts();
    const { handleSubmit, formState: { errors, }, control, reset } = useForm({ mode: "onChange" });

    useEffect(() => { reset(); }, [props.isOpen]);



    const onSubmit = async (data: FormProps) => {
        console.log(data);
        const newProduct = await productService.createProduct(
            {
                id: 0,
                name: data.name ?? "",
                category: data.category ?? "",
                description: data.description ?? "",
                price: data.price ?? 0.0
            });

        if (newProduct !== undefined) {
            setProducts([...products, newProduct]);
        }

        props.onClose();
    };

    return <Form
        isOpen={props.isOpen}
        title={"Criar Produto"}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={props.onClose}>
        <Controller
            control={control}
            name="name"
            defaultValue={""}
            rules={{ required: { value: true, message: "Campo Obrigatório" } }}
            render={({ field: { value, onChange } }) => (
                <FormInput
                    name={"Nome"}
                    //register={{ ...register("user", { required: "*Campo Obrigatório", },) }}
                    value={value}
                    onChange={onChange}
                    errorState={errors.name} />
            )}
        />
        <Controller
            control={control}
            name="category"
            defaultValue={""}
            rules={{ required: { value: true, message: "Campo Obrigatório" } }}
            render={({ field: { value, onChange } }) => (
                <FormInput
                    name={"Categoria"}
                    //register={{ ...register("user", { required: "*Campo Obrigatório", },) }}
                    value={value}
                    onChange={onChange}
                    errorState={errors.category} />
            )}
        />
        <Controller
            control={control}
            name="price"
            defaultValue={""}
            rules={{
                required: { value: true, message: "Campo Obrigatório" },
                pattern: { value: /^\d+(,\d{1,2})?$/, message: "Deve ser um decimal" }

            }}
            render={({ field: { value, onChange } }) => (
                <FormInput
                    name={"Preço"}
                    //register={{ ...register("user", { required: "*Campo Obrigatório", },) }}
                    value={value}
                    onChange={onChange}
                    errorState={errors.price} />
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
