import useEmployers from "app/features/Employers/hooks/useEmployers";
import { IEmpoyersService } from "app/features/Employers/interfaces/IEmployersService";
import AxiosEmployerService from "app/features/Employers/services/AxiosEmployerService";
import Form from "app/shared/components/Form/Form";
import InputForm from "app/shared/components/Form/FormInput/FormInput";
import { useEffect, useState } from "react";
interface CreateUserForm {
    isOpen: boolean,
    onClose: () => void,
    employerServiceInstance: IEmpoyersService
}


export default function CreateUserForm(props: CreateUserForm) {

    const employerService: IEmpoyersService = props.employerServiceInstance;

    const [employers, setEmployers] = useEmployers();

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

    const createHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newEmployer = await employerService.createEmployer({ user, name, cpf: cpf.replace(".", "").replace("-", ""), telefone: phone, email, role, password });
        if (newEmployer !== undefined) {
            setEmployers([...employers, newEmployer]);
        }

        props.onClose();
    };

    return <Form isOpen={props.isOpen} title={"Criar Usuario"} onSubmit={createHandler} onCancel={props.onClose}>
        <InputForm name={"Usuário"} value={user} onChange={event => setUser(event.target.value)} />
        <InputForm name={"Nome"} value={name} onChange={event => setName(event.target.value)} />
        <InputForm name={"CPF"} value={cpf} onChange={event => setCpf(event.target.value)} />
        <InputForm name={"Telefone"} value={phone} onChange={event => setPhone(event.target.value)} />
        <InputForm name={"E-mail"} value={email} onChange={event => setEmail(event.target.value)} />
        <InputForm name={"Role"} value={role} onChange={event => setRole(event.target.value)} />
        <InputForm name={"Password"} value={password} onChange={event => setPassword(event.target.value)} />
    </Form>;
}