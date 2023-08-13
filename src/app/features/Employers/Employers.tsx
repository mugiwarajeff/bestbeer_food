import styles from "./Employers.module.scss";
import Fab from "../../shared/components/Fab/Fab";
import SearchBar from "../../shared/components/SearchBar/SearchBar";
import UserTable from "./components/UserTable/UserTable";

export default function Employers(){

    const placeHolder = "Pesquise o funcionário aqui";

    return <section className={styles.employers}>
        <SearchBar placeHolder={placeHolder}/>
        <UserTable/>
        <Fab/>
    </section>;
}