import styles from "./UserTable.module.scss";
import { FaEdit } from "react-icons/fa";

export default function UserTable(){

    return <div className={styles.userTable}>
        <table>
            <thead>
                <tr>
                    <th>
                        Nome
                    </th>
                    <th>
                        email
                    </th>
                    <th>
                        telefone
                    </th>
                    <th>
                        actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        Jefferson
                    </td>
                    <td>
                        Jeffersoncerqueira@gmail.com
                    </td>
                    <td>
                        77 99858-7437
                    </td>
                    <td>
                        <FaEdit size={40}/>
                        <FaEdit size={40}/>
                        <FaEdit size={40}/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>;
}