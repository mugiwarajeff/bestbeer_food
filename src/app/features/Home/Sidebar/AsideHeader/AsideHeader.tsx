import styles from "./AsideHeader.module.scss";
import { FaUserAlt } from "react-icons/fa";

export default function AsideHeader(){
    return <header className={styles.asideHeader}>

        <div className={styles.asideHeader__icon}>
            <FaUserAlt size={32}/>
        </div>
        <div className={styles.asideHeader__userInfo}>
            <h4>Jefferson Cerqueira</h4>
            <span>Gerente</span>
        </div>
    </header>;
}