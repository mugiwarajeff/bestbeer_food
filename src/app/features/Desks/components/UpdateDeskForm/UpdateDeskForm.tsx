import Form from "app/shared/components/Form/Form";
import FormInput from "app/shared/components/Form/FormInput/FormInput";

import { IDeskService } from "../../interfaces/IDeskService";
import { IDesk } from "../../interfaces/IDesk";
import { useEffect, useState } from "react";
import useDeksState from "../../hooks/useDeskState";
import FormSwitch from "app/shared/components/Form/FormSwitch/FormSwitch";

interface UpdateDeskFormProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    desk: IDesk
    axiosDeskService: IDeskService

}

export default function UpdateDeskForm(props: UpdateDeskFormProps) {
    const [desks, setDesks] = useDeksState();
    const axiosDeskService = props.axiosDeskService;
    const [description, setDescription] = useState(props.desk.description);
    const [available, setAvailable] = useState<boolean>(props.desk.available);


    async function updateHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const toUpdateDesk: IDesk = {
            id: props.desk.id,
            available: available,
            description: description
        };

        const updatedDesk: IDesk | undefined = await axiosDeskService.updateDesk(toUpdateDesk);

        if (updatedDesk !== undefined) {
            setDesks(desks.map(desk => {
                if (desk.id === updatedDesk.id) {
                    desk = updatedDesk;
                }
                return desk;
            }));
        } else {
            alert("erro ao atualizar mesa");
        }

        props.setIsOpen(false);
    }

    useEffect(() => {
        setDescription(props.desk.description);
        setAvailable(props.desk.available);
    }, [props.isOpen]);

    return <Form
        isOpen={props.isOpen}
        onCancel={() => {
            props.setIsOpen(false);
        }}
        title={"Atualizar Mesa"}
        onSubmit={updateHandler}
    >
        <FormInput name="Id" value={props.desk.id} onChange={undefined} readonly={true} />
        <FormInput name="Description" value={description} onChange={event => setDescription(event.target.value)} />
        <FormSwitch name="Available" activate={available} onChange={() => setAvailable(!available)} />
    </Form>;
}