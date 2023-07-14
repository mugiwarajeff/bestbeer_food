import Input from "./Input/Input";
import styles from "./Login.module.scss";
import { FaRegUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";

export default function Login() {
    return <section className={styles.login} >
        <div className={styles["login__login-container"]}>
            <div className={styles["login__itens-container"]}>
                <h2>
                    Login no sistema
                </h2>
                <div>
                    <Input Icon={FaRegUser} />
                    <Input Icon={FiLock} />
                </div>
                <div className={styles["login__button-container"]}>
                    <div>button</div>
                    <h6>Esqueceu a senha?</h6>
                </div>
            </div>
        </div>
    </section>;

}
