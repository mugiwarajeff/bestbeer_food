import styles from "./UserTable.module.scss";
import { FaEdit } from "react-icons/fa";
import { AiOutlineClose, AiOutlineEdit, AiFillEye } from "react-icons/ai";
import { IEmployer } from "../../interfaces/IEmployer";
import { IEmpoyersService } from "../../interfaces/IEmployersService";
import useEmployers from "../../hooks/useEmployers";
import { useCurrentUser } from "app/shared/hooks/useCurrentUser";

interface TableProps {
    values: IEmployer[],
    onEditItem: (employer: IEmployer) => void,
    employerServiceInstance: IEmpoyersService
}

export default function UserTable({ values, employerServiceInstance, onEditItem }: TableProps) {
    const [employers, setEmployers] = useEmployers();
    const currentUser = useCurrentUser();

    const typeProperties = values.length > 0 ? Object.keys(values[0]) : [];
    typeProperties.shift();

    /**
     * typeProperties.map((propety) => <th key={typeProperties.indexOf(propety)}>
                        {propety.charAt(0).toUpperCase() + propety.slice(1)}
                    </th>)
     */

    const deleteUser = async (id: number) => {

        if (id === 1) {
            alert("Usuario administrador não pode ser escluido");
        } else if (currentUser?.id === id) {
            alert("Voce não pode deletar o usuario logado no momento");
        } else {
            const deletedEmployer = await employerServiceInstance.deleteEmployer(id);

            if (deletedEmployer !== undefined) {
                setEmployers(employers.filter(employer => employer.id != deletedEmployer?.id));
            }
        }
    };

    return <div className={styles.userTable}>
        <table>
            <thead>
                <tr>
                    <td>
                        User
                    </td>
                    <td>
                        CPF
                    </td>
                    <td>
                        Telefone
                    </td>
                    <td>
                        Email
                    </td>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {values.length > 0 ? values.map((employer) => <tr key={employer.id}>
                    <td>
                        {employer.user}
                    </td>
                    <td>
                        {employer.cpf}
                    </td>
                    <td>
                        {employer.telefone}
                    </td>
                    <td>
                        {employer.email}
                    </td>
                    <td>
                        <div className={styles.iconsContainer}>
                            <AiFillEye size={40} />
                            <AiOutlineEdit size={40} onClick={() => onEditItem(employer)} />
                            <AiOutlineClose size={40} color="red" onClick={() => deleteUser(employer.id)} />
                        </div>
                    </td>
                </tr>) : <div></div>
                }
            </tbody>
        </table>
    </div >;
}

/**
 * 
 */