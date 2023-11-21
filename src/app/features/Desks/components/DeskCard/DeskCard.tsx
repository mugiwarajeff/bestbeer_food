import { IDesk } from "../../interfaces/IDesk";
import styles from "./DeskCard.module.scss";
import { AiOutlineEye, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { FaMoneyBills, } from "react-icons/fa6";

interface DeskCardProps {
    desk: IDesk,
    deskNumber: number,
    onClick: React.MouseEventHandler<SVGElement> | undefined,
    onEdit: React.MouseEventHandler<SVGElement> | undefined
}

export default function DeskCard(props: DeskCardProps) {

    return <div className={styles.deskCard}>
        <div className={styles.deskCard__actions}>
            <AiOutlineClose size={32} color="red" className={styles.customIcon} onClick={props.onClick} />
            <AiOutlineEdit size={32} color="yellow" className={styles.customIcon} onClick={props.onEdit} />
        </div>
        <div className={styles.deskCard__itens}>
            <div>
                <h1>
                    {`Mesa ${props.deskNumber}`}
                </h1>
                {props.desk.available ?
                    "Disponivel" :
                    "Indisponivel"}
            </div>
            <div className={styles.eyeIcon}>
                <AiOutlineEye size={64} />
            </div>
            <div className={styles.deskCard__itens__view_details}>
                <FaMoneyBills size={22} />
                <a href="">Visualizar Conta</a>
            </div>
        </div>
    </div>;
}