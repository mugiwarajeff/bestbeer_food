import SearchBar from "app/shared/components/SearchBar/SearchBar";
import styles from "./Stock.module.scss";
import Fab from "app/shared/components/Fab/Fab";

export default function Stocks() {

    const placeHolder = "Pesquise seus produtos em estoque";

    return <section className={styles.stock}>
        <SearchBar placeHolder={placeHolder}/>
        <Fab onClick={() => {
            console.log("");

}}/>
    </section>;
}