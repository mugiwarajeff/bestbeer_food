import styles from "./Desks.module.scss";
import DeskCard from "./components/DeskCard/DeskCard";
import classNames from "classnames";
import { getSidebarState } from "../Home/hooks/UseSideBar";
import { IDesk } from "./interfaces/IDesk";
import { IDeskService } from "./interfaces/IDeskService";
import { AxiosDeskService } from "./services/axiosDeskService";
import useDeksState from "./hooks/useDeskState";
import { LocalStorage } from "app/shared/localstorage/impl/localStorage";
import { useEffect, useState } from "react";
import { IRefreshTokenService } from "app/shared/services/interface/IRefreshTokenService";
import { AxiosRefreshTokenService } from "app/shared/services/AxiosRefreshTokenService";
import IStorageService from "app/shared/localstorage/interfaces/IStorageService";
import Fab from "app/shared/components/Fab/Fab";


import Form from "app/shared/components/Form/Form";
import FormInput from "app/shared/components/FormInput/FormInput";

export default function Desks() {
    const localStorage: IStorageService = new LocalStorage();
    const refreshTokenService: IRefreshTokenService = new AxiosRefreshTokenService();
    const axiosDeskService: IDeskService = new AxiosDeskService(localStorage, refreshTokenService);

    const [desks, setDesks] = useDeksState();
    const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
    const [formDescription, setFormDescription] = useState<string>("");

    useEffect(() => {
        axiosDeskService.getAllDesks().then((desks: IDesk[]) => {
            setDesks(desks);
        });
    }, []);

    const isOpen = getSidebarState();
    const classes = classNames({
        [styles.desks]: true,
        [styles.desks__open]: !isOpen
    });

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const newDesk = await axiosDeskService.create({
            description: formDescription,
            available: true
        });

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setDesks([...desks, newDesk!]);
        setFormIsOpen(false);
    }

    return <section className={classes}>
        {desks.map(
            (desk) => <DeskCard
                onClick={async () => {
                    const deletedDesk = await axiosDeskService.deleteDesk(desk.id);
                    console.log(deletedDesk);
                    setDesks(desks.filter(desk => desk.id !== deletedDesk?.id));
                }}
                key={desk.id}
                desk={desk} />
        )}
        <Fab onClick={async () => setFormIsOpen(true)} />
        <Form title="Criar Mesa" isOpen={formIsOpen} onSubmit={submitHandler} onCancel={() => setFormIsOpen(false)}>
            <FormInput name="description" value={formDescription} onChange={event => setFormDescription(event.target.value)} />
            <FormInput name="description" value={formDescription} onChange={event => setFormDescription(event.target.value)} />
            <FormInput name="description" value={formDescription} onChange={event => setFormDescription(event.target.value)} />
            <FormInput name="description" value={formDescription} onChange={event => setFormDescription(event.target.value)} />
        </Form>
    </section >;
}

/**async (description) => {
            const newDesk = await axiosDeskService.create({
                description: description,
                available: true
            });

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            setDesks([...desks, newDesk!]);
            setFormIsOpen(false); */