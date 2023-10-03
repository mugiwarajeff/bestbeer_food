import Fab from "app/shared/components/Fab/Fab";
import SearchBar from "app/shared/components/SearchBar/SearchBar";
import styles from "./Products.module.scss";

export default function Products(){

    const placeHolder = "Pesquise seus produtos aqui";

    return <section className={styles.products}>
        <SearchBar placeHolder={placeHolder}/>
        <Fab onClick={() => {
            console.log("");

}}/>
    </section>;
}