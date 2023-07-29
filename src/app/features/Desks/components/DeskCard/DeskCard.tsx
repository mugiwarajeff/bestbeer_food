import { IDesk } from "../../interfaces/IDesk";
import styles from "./DeskCard.module.scss";
import { AiOutlineEye } from "react-icons/ai";
import { FaMoneyBills } from "react-icons/fa6";

interface DeskCardProps {
    desk: IDesk
}

export default function DeskCard(props: DeskCardProps){

    return <div className={styles.deskCard}>
            <div className={styles.deskCard__itens}>
                <div>
                    <h1>
                        {`Mesa ${props.desk.id}`}
                    </h1>
                    {props.desk.available ? 
                        "Disponivel" : 
                        "Indisponivel"}
                </div>
                <div className={styles.eyeIcon}>
                <AiOutlineEye size={64}/>
                </div>
                <div className={styles.deskCard__itens__view_details}>
                    <FaMoneyBills size={22}/>
                    <a href="">Visualizar Conta</a>
                </div>    
            </div>
        </div>;
}