import styles from "./Employers.module.scss";
import Fab from "../../shared/components/Fab/Fab";
import SearchBar from "../../shared/components/SearchBar/SearchBar";
import UserTable from "./components/UserTable/UserTable";
import employers from "./Employers.json";
export default function Employers() {

    const placeHolder = "Pesquise o funcionário aqui";

    return <section className={styles.employers}>
        <SearchBar placeHolder={placeHolder} />
        <UserTable values={employers} />
        <Fab onClick={() => {

            console.log("");
}} />
    </section>;
}