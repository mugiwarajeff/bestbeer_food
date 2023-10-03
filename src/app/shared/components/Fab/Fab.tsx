import {AiOutlinePlus} from "react-icons/ai";
import styles from "./Fab.module.scss";

interface FabProps  {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function Fab(props: FabProps){

    const iconButtonSize = 40;

    return <button className={styles.fab} onClick={props.onClick}>
        <AiOutlinePlus size={iconButtonSize} color="white"/>
    </button>;
}