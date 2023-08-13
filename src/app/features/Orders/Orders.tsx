import Fab from "app/shared/components/Fab/Fab";
import SearchBar from "app/shared/components/SearchBar/SearchBar";
import styles from "./Orders.module.scss";

export default function Orders(){

    const placeHolder = "Pesquise seus Pedidos";

    return <section className={styles.orders}>
        <SearchBar placeHolder={placeHolder}/>
    </section>;
}