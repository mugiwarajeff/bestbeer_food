import { IconType } from "react-icons/lib";
import styles from "./Input.module.scss";

interface InputProps {
    Icon: IconType
}

export default function Input({ Icon }: InputProps) {

    return <div className={styles["input-container"]}>
        <div className={styles["input-container__icon"]}>
            <Icon color="black" size="32px" />
        </div>
        <input type="text" placeholder={"Usuário"} />
    </div>;
}