import Form from "app/shared/components/Form/Form";
import FormInput from "app/shared/components/Form/FormInput/FormInput";
import { useState } from "react";
import { IDeskService } from "../../interfaces/IDeskService";
import useDeksState from "../../hooks/useDeskState";

interface CreateDeskFormProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    axiosDeskService: IDeskService
}


export default function CreateDeskForm(props: CreateDeskFormProps) {

    const [desks, setDesks] = useDeksState();
    const [formDescription, setFormDescription] = useState<string>("");

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const newDesk = await props.axiosDeskService.create({
            description: formDescription,
            available: true
        });

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setDesks([...desks, newDesk!]);
        props.setIsOpen(false);
        setFormDescription("");
    }


    return <Form title="Criar Mesa" isOpen={props.isOpen} onSubmit={submitHandler} onCancel={() => {
        setFormDescription("");
        props.setIsOpen(false);
    }}>
        <FormInput name="description" value={formDescription} onChange={event => setFormDescription(event.target.value)} />

    </Form>;
}