import styles from "./Input.module.scss";

export default function Input() {

    return <div className={styles["input-container"]}>
        <div className={styles["input-container__icon"]}></div>
        <input type="text" placeholder={"Usuário"} />
    </div>;
}