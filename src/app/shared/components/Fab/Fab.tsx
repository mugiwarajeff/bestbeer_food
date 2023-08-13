import {AiOutlinePlus} from "react-icons/ai";
import styles from "./Fab.module.scss";

export default function Fab(){

    const iconButtonSize = 40;

    return <button className={styles.fab}>
        <AiOutlinePlus size={iconButtonSize} color="white"/>
    </button>;
}