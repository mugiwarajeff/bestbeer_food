import { useParams } from "react-router-dom";
import { IOrderService } from "./interfaces/IOrderService";
import { AxiosOrderService } from "./services/AxiosOrderService";
import { useEffect, useState } from "react";
import { IOrder } from "./interfaces/IOrder";
import Fab from "app/shared/components/Fab/Fab";
import CreateOrderItemForm from "./components/CreateOrderItemForm/CreateOrderItemForm";
import OrderDetailFields from "./components/OrderDetailFields/OrderDetailFields";
import OrderDetailItens from "./components/OrderDetailItens/OrderDetailItens";
import { IProductService } from "../Products/interfaces/IProductService";
import AxiosProductService from "../Products/services/AxiosProductService";
import useSetProducts from "../Products/hooks/UseSetProducts";
import { IProduct } from "../Products/interfaces/IProduct";
import { StockService } from "../Stocks/interfaces/StockService";
import { useSetStocks } from "../Stocks/hooks/UseSetStocks";
import { IStock } from "../Stocks/interfaces/IStock";
import { AxiosStockService } from "../Stocks/services/AxiosStockService";
import styles from "./OrderDetail.module.scss";
import UseStocksValue from "../Stocks/hooks/UseStocksValue";


export default function OrderDetail() {
    const ordersService: IOrderService = new AxiosOrderService();
    const productService: IProductService = new AxiosProductService();
    const stockService: StockService = new AxiosStockService();

    const setStock = useSetStocks();
    const stocks = UseStocksValue();
    const { id } = useParams();
    const [order, setOrder] = useState<IOrder>({ description: "", deskId: 0, id: 0, itens: [], status: "" });
    const setProduct = useSetProducts();
    const [formOpen, setFormOpen] = useState<boolean>(false);

    useEffect(() => {
        ordersService.getOrder(id === undefined ? 0 : +id).then((order: IOrder) => {
            setOrder(order);

        });

        productService.getProducts().then((products: IProduct[]) => setProduct(products));
        stockService.getStock().then((stock: IStock[]) => setStock(stock));
    }, []);

    const deleteOrderItem = async (id: number) => {
        const deletedOrder = await ordersService.deleteOrderItem(id);
        const stock: IStock = stocks.find((stock: IStock) => stock.productId === deletedOrder.productId)!;

        const updatedItens = order.itens.filter(orderitem => orderitem.id !== deletedOrder.id);

        ordersService.getOrder(id === undefined ? 0 : +id).then((order: IOrder) => {
            setOrder({ ...order, itens: updatedItens });
        });


        const updatedStock: IStock = await stockService.updateStock({
            id: stock.id,
            quantity: stock.quantity + deletedOrder.quantity,
            productId: stock.productId
        });

        setStock(stocks.map(stock => {
            if (stock.id === updatedStock.id) {
                stock = updatedStock;
            }

            return stock;
        }));


    };


    return order !== undefined ? <div className={styles.orderDetail}>

        <OrderDetailFields order={order} />
        {order !== undefined}
        <OrderDetailItens order={order} onDelete={deleteOrderItem} />
        <Fab onClick={() => {
            setFormOpen(true);
        }} />

        <CreateOrderItemForm
            order={order}
            setOrder={setOrder}
            isOpen={formOpen}
            ordersServiceInstance={ordersService}
            stockServiceInstance={stockService}
            onClose={() => {
                setFormOpen(false);
            }}
        />
    </div> : <div></div>;
}