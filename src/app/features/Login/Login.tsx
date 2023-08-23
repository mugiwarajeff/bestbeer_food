import LoginButton from "./components/Button/LoginButton";
import Input from "./components/Input/Input";
import styles from "./Login.module.scss";
import { FaRegUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { useState } from "react";
import CircularProgress from "./components/CircularProgress/CircularProgress";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetCurrentUser } from "app/shared/hooks/useCurrentUser";
import { ILogin } from "./interfaces/login";
import { AxiosLoginService } from "./services/axiosLoginService";
import { ILoginService } from "./interfaces/loginService";
import { UnauthorizedException } from "app/shared/exceptions/unauthorizedException";
import { ServerException } from "app/shared/exceptions/serverException";
import IStorageService from "app/shared/localstorage/interfaces/IStorageService";
import { LocalStorage } from "app/shared/localstorage/impl/localStorage";

export default function Login() {

    const loginService: ILoginService = new AxiosLoginService();
    const storageService: IStorageService = new LocalStorage();

    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { handleSubmit, register, formState } = useForm({ mode: "onSubmit" });
    const { errors, isSubmitting } = formState;

    const setCurrentUser = useSetCurrentUser();
    const navigator = useNavigate();

    async function onSubmitHandler() {
        const attemptLogin: ILogin = {
            user: user,
            password: password,
        };

        try {
            const {user, accessToken, refreshToken} = await loginService.createLogin(attemptLogin);
            alert("Login realizado com sucesso");
            setCurrentUser(user);
            storageService.saveAccessToken(accessToken);
            storageService.saveRefreshToken(refreshToken);
            navigator("/home");
            
        } catch(error) {
            console.log(error);
            if(error instanceof UnauthorizedException){
                alert("Usuario ou senha invalidos... tente novamente");
            }else if (error instanceof ServerException){
                alert("Erro no servidor");
            }else {
                alert("Erro desconhecido");
            }
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
