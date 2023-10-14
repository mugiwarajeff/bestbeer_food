import Form from "app/shared/components/Form/Form";
import { IEmpoyersService } from "../../interfaces/IEmployersService";
import { IEmployer } from "../../interfaces/IEmployer";
import { useForm } from "react-hook-form";

interface UpdateUserFormProps {
    isOpen: boolean,
    onClose: () => void,
    user: IEmployer,
    employerServiceInstance: IEmpoyersService;
}

export default function UpdateUserForm(props: UpdateUserFormProps) {

    const { handleSubmit, register, formState } = useForm({ mode: "onSubmit" });
    const { errors } = formState;

    const updateHandler = () => {
        props.onClose();
    };


    return <Form
        isOpen={props.isOpen}
        onCancel={props.onClose}
        title="Atualizar Funcionário"
        onSubmit={handleSubmit(updateHandler)}
    >

    </Form>;
}