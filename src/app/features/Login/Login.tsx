import LoginButton from "./components/Button/LoginButton";
import Input from "./components/Input/Input";
import styles from "./Login.module.scss";
import { FaRegUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { useState } from "react";
import CircularProgress from "./components/CircularProgress/CircularProgress";
import { FieldValues, useForm } from "react-hook-form";


export default function Login() {

    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { handleSubmit, register, formState } = useForm({ mode: "onSubmit" });
    const { errors, isSubmitting } = formState;

    function simulatePromisse(): Promise<void> {
        return new Promise(resolve => {
            setTimeout(resolve, 3000);
        },);
    }

    async function onSubmitHandler(values: FieldValues) {
        await simulatePromisse();
        console.log(isSubmitting);
        console.log(user);
        console.log(password);
        console.log(errors);
        console.log(values);
    }

    //const users = [{ user: "user1", password: "123" }, { user: "user2", password: "456" }];

    return <section className={styles.login} >
        {isSubmitting ? <CircularProgress /> : null}
        <div className={styles["login__login-container"]}>
            <form
                className={styles["login__itens-container"]}
                onSubmit={handleSubmit(onSubmitHandler)}>
                <h2 className={styles.login__title}>
                    Login no sistema
                </h2>
                <Input
                    Icon={FaRegUser}
                    placeHolder="Usuário"
                    inputType="text"
                    value={user}
                    setValue={setUser}
                    register={{ ...register("user", { required: "*Campo Obrigatório" }) }}
                    errorState={errors.user}
                />

                <Input
                    Icon={FiLock}
                    placeHolder="Senha"
                    inputType="password"
                    value={password}
                    setValue={setPassword}
                    register={{ ...register("password", { required: "*Campo Obrigatório" }) }}
                    errorState={errors.password}
                />
                <LoginButton
                    label="Entrar"
                />
                <h6 className={styles["login__link-forgot-password"]}>
                    Esqueceu a senha?
                </h6>

            </form>
        </div>
    </section>;

}
