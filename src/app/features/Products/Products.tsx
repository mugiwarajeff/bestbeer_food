import Fab from "app/shared/components/Fab/Fab";
import SearchBar from "app/shared/components/SearchBar/SearchBar";
import styles from "./Products.module.scss";
import ProductTable from "./components/ProductTable/ProductTable";
import { IProduct } from "./interfaces/IProduct";
import { IProductService } from "./interfaces/IProductService";
import AxiosProductService from "./services/AxiosProductService";
import useProducts from "./hooks/UseProducts";
import { useEffect, useState } from "react";
import CreateProductForm from "./components/CreateProductForm/CreateProductForm";
import UpdateProductForm from "./components/UpdateProductForm/UpdateProductForm";

export default function Products() {
    const productService: IProductService = new AxiosProductService();
    const [products, setProducts] = useProducts();
    const [createFormOpen, setCreateFormOpen] = useState<boolean>(false);
    const [updateFormOpen, setUpdateFormOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct>();


    useEffect(() => {
        productService.getProducts().then((newProducts: IProduct[]) => {
            setProducts(newProducts);
        });
    }, []);

    const placeHolder = "Pesquise seus produtos aqui";

    const cancelForm = () => {
        setCreateFormOpen(false);
        setUpdateFormOpen(false);
    };

    const onClickToEditItem = (product: IProduct) => {
        setSelectedProduct(product);
        setUpdateFormOpen(true);
    };


    return <section className={styles.products}>
        <SearchBar placeHolder={placeHolder} />
        <ProductTable values={products} onEditItem={onClickToEditItem} productServiceInstance={productService} />
        <Fab onClick={() => {
            setCreateFormOpen(true);

        }} />
        <CreateProductForm
            isOpen={createFormOpen}
            onClose={cancelForm}
            productServiceInstance={productService} />
        <UpdateProductForm isOpen={updateFormOpen} onClose={
            cancelForm
        } product={selectedProduct === undefined ? {
            id: 0,
            name: "",
            category: "",
            description: "",
            price: 0
        } : selectedProduct} productServiceInstance={productService} />
    </section>;
}