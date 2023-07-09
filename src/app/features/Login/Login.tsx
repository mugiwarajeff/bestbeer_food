import Input from "./Input/Input";
import styles from "./Login.module.scss";

export default function Login() {
    return <section className={styles.login} >

        <div className={styles["login__login-container"]}>
            <h2>
                Login no sistema
            </h2>
            <div>
                <Input/>
                <Input/>
            </div>
            <div className={styles["login__button-container"]}>
                <div>button</div>
                <h6>Esqueceu a senha?</h6>
            </div>

        </div>
    </section>;

}
