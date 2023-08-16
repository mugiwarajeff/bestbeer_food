import styles from "./UserTable.module.scss";
import { FaEdit } from "react-icons/fa";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { IEmployer } from "../../interfaces/employers";

interface TableProps {
    values: IEmployer[]
}

export default function UserTable({ values }: TableProps) {

    const typeProperties = Object.keys(values[0]);
    typeProperties.shift();

    return <div className={styles.userTable}>
        <table>
            <thead>
                <tr>
                    {typeProperties.map((propety) => <th key={typeProperties.indexOf(propety)}>
                        {propety.charAt(0).toUpperCase() + propety.slice(1)}
                    </th>)}
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {values.map((employer) => <tr key={employer.id}>
                    <td>
                        {employer.name}
                    </td>
                    <td>
                        {employer.email}
                    </td>
                    <td>
                        {employer.telefone}
                    </td>
                    <td>
                        <div className={styles.iconsContainer}>
                            <FaEdit size={40} />
                            <AiOutlineEdit size={40} />
                            <AiOutlineClose size={40} color="red" />
                        </div>
                    </td>
                </tr>)
                }
            </tbody>
        </table>
    </div >;
}

/**
 * 
 */