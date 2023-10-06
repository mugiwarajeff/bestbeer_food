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


import CreateDeskForm from "./components/CreateDeskForm/CreateDeskForm";
import UpdateDeskForm from "./components/UpdateDeskForm/UpdateDeskForm";

export default function Desks() {
    const localStorage: IStorageService = new LocalStorage();
    const refreshTokenService: IRefreshTokenService = new AxiosRefreshTokenService();
    const axiosDeskService: IDeskService = new AxiosDeskService(localStorage, refreshTokenService);

    const [desks, setDesks] = useDeksState();
    const [editingDesk, setEditingDesk] = useState<IDesk>({ available: true, description: "", id: 0 });
    const [createFormIsOpen, setCreateFormIsOpen] = useState<boolean>(false);
    const [updateFormIsOpen, setUpdateFormIsOpen] = useState<boolean>(false);

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


    return <section className={classes}>
        {desks.map(
            (desk) => <DeskCard
                onClick={async () => {
                    const deletedDesk = await axiosDeskService.deleteDesk(desk.id);
                    console.log(deletedDesk);
                    setDesks(desks.filter(desk => desk.id !== deletedDesk?.id));
                }}
                onEdit={() => {
                    setEditingDesk(desk);
                    setUpdateFormIsOpen(true);
                }}
                key={desk.id}
                desk={desk} />
        )}
        <Fab onClick={async () => setCreateFormIsOpen(true)} />
        <CreateDeskForm
            isOpen={createFormIsOpen}
            setIsOpen={setCreateFormIsOpen}
            axiosDeskService={axiosDeskService}
        />
        <UpdateDeskForm
            desk={editingDesk}
            isOpen={updateFormIsOpen}
            setIsOpen={setUpdateFormIsOpen}
            axiosDeskService={axiosDeskService}
        />
    </section >;
}
