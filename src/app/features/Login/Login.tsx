import LoginButton from "./components/Button/LoginButton";
import Input from "./components/Input/Input";
import styles from "./Login.module.scss";
import { FaRegUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { useState } from "react";
import CircularProgress from "./components/CircularProgress/CircularProgress";
import { FieldValues, useForm } from "react-hook-form";
import { IUser } from "./interfaces/users";
import users from "./users.json";
import { useNavigate } from "react-router-dom";


export default function Login() {

    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { handleSubmit, register, formState } = useForm({ mode: "onSubmit" });
    const { errors, isSubmitting } = formState;

    const navigator = useNavigate();

    function simulatePromisse(): Promise<void> {
        return new Promise(resolve => {
            setTimeout(resolve, 3000);
        },);
    }

    function compareUsers(comparedUser: IUser, users: IUser[]) : boolean {
        for (const user of users){
            if(user.user === comparedUser.user && user.password === comparedUser.password) {
                return true;
            }
        }

        return false;
    }

    async function onSubmitHandler(values: FieldValues){
        await simulatePromisse();
        
        const createdUser: IUser = {
            user: user,
            password: password
        };

        if(compareUsers(createdUser, users)){
            alert("Login realizado com sucesso");
            navigator("/home");
        }else{
            alert("Usuario ou senha invalidos... tente novamente");
        }    
    }
 

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
