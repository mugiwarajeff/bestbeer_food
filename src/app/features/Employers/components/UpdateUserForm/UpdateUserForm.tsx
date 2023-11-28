import Form from "app/shared/components/Form/Form";
import InputForm from "app/shared/components/Form/FormInput/FormInput";
import { IEmpoyersService } from "../../interfaces/IEmployersService";
import { IEmployer } from "../../interfaces/IEmployer";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useEmployers from "../../hooks/useEmployers";
import FormSelecion from "app/shared/components/Form/FormSelection/FormSelecion";


interface UpdateUserFormProps {
    isOpen: boolean,
    onClose: () => void,
    user: IEmployer,
    employerServiceInstance: IEmpoyersService;
}

export default function UpdateUserForm(props: UpdateUserFormProps) {

    const { handleSubmit, register, formState } = useForm({ mode: "onChange" });
    const { errors } = formState;
    const [employers, setEmployers] = useEmployers();

    const updateHandler = async () => {
        const updatedEmployer = await props.employerServiceInstance.updateEmployer({
            id: props.user.id,
            user,
            name,
            cpf: cpf.replaceAll(".", "").replace("-", ""),
            telefone: phone,
            email,
            role,
            password
        });

        if (updatedEmployer !== undefined) {
            setEmployers(employers.map(employers => {
                if (employers.id === updatedEmployer.id) {
                    employers = updatedEmployer;
                }

                return employers;
            }));
        } else {
            alert("Erro ao atualizar Usuário");
        }


        props.onClose();
    };

    const [user, setUser] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        if (props.user !== undefined) {
            setUser(props.user.user);
            setName(props.user.name);
            setCpf(props.user.cpf);
            setPhone(props.user.telefone);
            setEmail(props.user.email);
            setRole(props.user.role);
            setPassword(props.user.password);
        } else {
            setUser("");
            setName("");
            setCpf("");
            setPhone("");
            setEmail("");
            setRole("");
            setPassword("");
        }

    }, [props.isOpen]);


    return <Form
        isOpen={props.isOpen}
        onCancel={props.onClose}
        title="Atualizar Funcionário"
        onSubmit={handleSubmit(updateHandler)}
    >
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
        <FormSelecion name={"Função"} value={role} onChange={event => setRole(event.target.value)} values={[
            "admin",
            "Garçon",
            "Caixa",
            "Gerente"
        ]} errorState={errors.role} />
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