import { Controller, useForm } from "react-hook-form";
import { IProduct } from "../../interfaces/IProduct";
import { IProductService } from "../../interfaces/IProductService";
import useProducts from "../../hooks/UseProducts";
import { useEffect } from "react";
import FormInput from "app/shared/components/Form/FormInput/FormInput";
import Form from "app/shared/components/Form/Form";

interface UpdateUserFormProps {
    isOpen: boolean,
    onClose: () => void,
    product: IProduct,
    productServiceInstance: IProductService;
}

interface FormProps {
    name?: string,
    category?: string,
    price?: number,
    description?: string
}

export default function UpdateUserForm(props: UpdateUserFormProps) {
    const {
        handleSubmit,
        formState,
        control,
        reset, setValue } = useForm({ mode: "onChange" });
    const { errors } = formState;
    const [products, setProducts] = useProducts();

    const updateHandler = async (data: FormProps) => {
        const updatedProduct: IProduct = await props.productServiceInstance.updateProduct({
            id: props.product.id,
            category: data.category ?? "",
            description: data.description ?? "",
            name: data.name ?? "",
            price: data.price ?? 0
        });

        if (updatedProduct !== undefined) {
            setProducts(products.map(products => {
                if (products.id === updatedProduct.id) {
                    products = updatedProduct;
                }

                return products;
            }));
        } else {
            alert("Erro ao atualizar Produto");
        }
        props.onClose();
    };



    useEffect(() => {
        setValue("name", props.product.name);
        setValue("category", props.product.category);
        setValue("description", props.product.description);
        setValue("price", props.product.price.toString().replaceAll(".", ","));
        if (props.isOpen === false) {
            reset();
        }
    }, [props.isOpen]);


    return <Form
        onSubmit={handleSubmit(updateHandler)}
        isOpen={props.isOpen}
        onCancel={props.onClose}
        title="Atualizar Produto"
    >
        <Controller
            control={control}
            name="name"
            defaultValue={props.product.name}
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
            defaultValue={props.product.category}
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
            defaultValue={props.product.price}
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
            defaultValue={props.product.description}
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