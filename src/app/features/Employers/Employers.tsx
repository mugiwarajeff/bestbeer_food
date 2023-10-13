import styles from "./Employers.module.scss";
import Fab from "../../shared/components/Fab/Fab";
import SearchBar from "../../shared/components/SearchBar/SearchBar";
import UserTable from "./components/UserTable/UserTable";
import { IEmpoyersService } from "./interfaces/IEmployersService";
import AxiosEmployerService from "./services/AxiosEmployerService";
import { IEmployer } from "./interfaces/IEmployer";
import { useEffect, useState } from "react";
import useEmployers from "./hooks/useEmployers";
import CreateUserForm from "./components/CreateUserForm/CreateUserForm";
import UpdateUserForm from "./components/UpdateUserForm/UpdateUserForm";
export default function Employers() {
    const employersService: IEmpoyersService = new AxiosEmployerService();
    const [employers, setEmployers] = useEmployers();
    const [createFormOpen, setCreateFormOpen] = useState<boolean>(false);
    const [updateFormOpen, setUpdateFormOpen] = useState<boolean>(false);

    useEffect(() => {
        employersService.getAllEmployers()
            .then((newEmployers: IEmployer[]) => {
                setEmployers(newEmployers);
            });
    }, []);

    const placeHolder = "Pesquise o funcionário aqui";

    const cancelForm = () => {
        setCreateFormOpen(false);
        setUpdateFormOpen(false);
    };

    const demoEmployer: IEmployer = {
        cpf: "072.855.765-73",
        email: "jeffersoncerqueira75@gmail.com",
        id: 0,
        name: "Jefferson",
        password: "1234Ab",
        role: "garcon",
        telefone: "55 77 99858-7437",
        user: "jefferson"
    };

    return <section className={styles.employers}>
        <SearchBar placeHolder={placeHolder} />
        <UserTable values={employers} employerServiceInstance={employersService} />
        <Fab onClick={() => {
            setCreateFormOpen(true);
        }} />
        <CreateUserForm isOpen={createFormOpen} onClose={cancelForm} employerServiceInstance={employersService} />
        <UpdateUserForm isOpen={updateFormOpen} onClose={cancelForm} employerServiceInstance={employersService} user={demoEmployer} />
    </section>;
}