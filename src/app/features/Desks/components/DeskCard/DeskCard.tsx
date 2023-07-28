import { IDesk } from "../../interfaces/IDesk";
import styles from "./DeskCard.module.scss";

interface DeskCardProps {
    desk: IDesk
}

export default function DeskCard(props: DeskCardProps){

    return <div className={styles.deskCard}>
        
    </div>;
}