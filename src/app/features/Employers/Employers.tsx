import styles from "./Employers.module.scss";
import Fab from "../../shared/components/Fab/Fab";
import SearchBar from "../../shared/components/SearchBar/SearchBar";
import UserTable from "./components/UserTable/UserTable";
import { IEmpoyersService } from "./interfaces/IEmployersService";
import AxiosEmployerService from "./services/AxiosEmployerService";
import { IEmployer } from "./interfaces/IEmployer";
import { useEffect } from "react";
import useEmployers from "./hooks/useEmployers";
export default function Employers() {
    const employersService : IEmpoyersService = new AxiosEmployerService();
    const [employers, setEmployers] = useEmployers();

    useEffect(() => {
        employersService.getAllEmployers()
            .then((employers: IEmployer[]) => console.log("na pagina: " + employers[0]));
    }, []);

    const placeHolder = "Pesquise o funcionário aqui";

    return <section className={styles.employers}>
        <SearchBar placeHolder={placeHolder} />
        <UserTable values={employers} />
        <Fab onClick={() => {

            console.log("");
}} />
    </section>;
}