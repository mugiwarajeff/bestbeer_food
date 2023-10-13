import useEmployers from "app/features/Employers/hooks/useEmployers";
import { IEmpoyersService } from "app/features/Employers/interfaces/IEmployersService";
import Form from "app/shared/components/Form/Form";
import InputForm from "app/shared/components/Form/FormInput/FormInput";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
interface CreateUserForm {
    isOpen: boolean,
    onClose: () => void,
    employerServiceInstance: IEmpoyersService
}


export default function CreateUserForm(props: CreateUserForm) {

    const employerService: IEmpoyersService = props.employerServiceInstance;

    const [employers, setEmployers] = useEmployers();
    const { handleSubmit, register, formState } = useForm({ mode: "onSubmit" });
    const { errors } = formState;

    const [user, setUser] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        setUser("");
        setName("");
        setCpf("");
        setPhone("");
        setEmail("");
        setRole("");
        setPassword("");
    }, [props.isOpen]);

    const createHandler = async () => {
        const newEmployer = await employerService.createEmployer({ user, name, cpf: cpf.replace(".", "").replace("-", ""), telefone: phone, email, role, password });
        if (newEmployer !== undefined) {
            setEmployers([...employers, newEmployer]);
        }

        props.onClose();
    };

    return <Form
        isOpen={props.isOpen}
        title={"Criar Usuario"}
        onSubmit={handleSubmit(createHandler)}
        onCancel={props.onClose}>
        <InputForm
            name={"Usuário"}
            register={{ ...register("user", { required: "*Campo Obrigatório", },) }}
            value={user}
            onChange={event => setUser(event.target.value)}
            errorState={errors.user} />
        <InputForm
            name={"Nome"}
            value={name}
            onChange={(event) => setName(event.target.value)}
            register={{ ...register("name", { required: "*Campo Obrigatório" }) }}
            errorState={errors.name} />
        <InputForm
            name={"CPF"}
            value={cpf}
            onChange={event => setCpf(event.target.value)}
            register={{
                ...register("cpf", { pattern: { value: /(\d{3}).(\d{3}).(\d{3})-(\d{2})/, message: "CPF Invalido!" } })
            }}
            errorState={errors.cpf} />
        <InputForm
            name={"Telefone"}
            value={phone}
            onChange={event => setPhone(event.target.value)}
            register={{
                ...register("phone",
                    {
                        required: "Campo Obrigatório",
                        pattern: { value: /(\d{2})\s(\d{2})\s(\d{4,5}-\d{4})/g, message: "Invalido!, deve atender ao padrão: (xx xx xxxxx-xxxx) " }
                    })
            }}
            errorState={errors.phone} />
        <InputForm
            name={"E-mail"}
            value={email}
            onChange={event => {
                setEmail(event.target.value);
                console.log(email);
            }}
            register={{
                ...register("email", {
                    required: "*Campo Obrigatório",
                    pattern: { value: /(.*)@(.*).(com)(.br)?/g, message: "E-mail Invalido" }
                })
            }}
            errorState={errors.email}
        />
        <InputForm
            name={"Role"}
            value={role}
            onChange={event => setRole(event.target.value)}
            register={{
                ...register("role", {
                    required: "*Campo Obrigatório"
                })
            }}
            errorState={errors.role}
        />
        <InputForm
            name={"Password"}
            value={password}
            onChange={event => setPassword(event.target.value)}
            register={{
                ...register("password", {
                    required: "*Campo Obrigatório",
                    pattern: { value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Senha não é forte o suficiente" }
                })
            }}
            errorState={errors.password}
        />
    </Form>;
}