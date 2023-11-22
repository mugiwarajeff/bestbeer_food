import { AiFillEye, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import useProducts from "../../hooks/UseProducts";
import { IProduct } from "../../interfaces/IProduct";
import { IProductService } from "../../interfaces/IProductService";
import styles from "./ProductTable.module.scss";

interface TableProps {
    values: IProduct[],
    onEditItem: (product: IProduct) => void,
    productServiceInstance: IProductService
}

export default function ProductTable({ values, productServiceInstance, onEditItem }: TableProps) {
    const [products, setProducts] = useProducts();

    const typeProperties = values.length > 0 ? Object.keys(values[0]) : [];
    typeProperties.shift();

    const deleteProduct = async (product: IProduct) => {
        const deletedProduct = await productServiceInstance.deleteProduct(product);

        if (deletedProduct !== undefined) {
            setProducts(products.filter(product => product.id != deletedProduct?.id));

        }

    };

    return <div className={styles.productTable}>
        <table>
            <thead>
                <tr>
                    <td>
                        Nome
                    </td>
                    <td>
                        Categoria
                    </td>
                    <td>
                        Preço
                    </td>
                    <td>
                        Descrição
                    </td>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {values.length > 0 ? values.map((product) => <tr key={product.id}>
                    <td>
                        {product.name}
                    </td>
                    <td>
                        {product.category}
                    </td>
                    <td>
                        {product.price}
                    </td>
                    <td>
                        {product.description}
                    </td>
                    <td>
                        <div className={styles.iconsContainer}>
                            <AiFillEye size={40} />
                            <AiOutlineEdit size={40} onClick={() => onEditItem(product)} />
                            <AiOutlineClose size={40} color="red" onClick={() => deleteProduct(product)} />
                        </div>
                    </td>
                </tr>) : <div></div>
                }
            </tbody>
        </table>
    </div >;
}
