import styles from "./Desks.module.scss";
import DeskCard from "./components/DeskCard/DeskCard";
import classNames from "classnames";
import { getSidebarState } from "../Home/hooks/UseSideBar";
import { IDesk } from "./interfaces/IDesk";
import { IDeskService } from "./interfaces/IDeskService";
import { AxiosDeskService } from "./services/axiosDeskService";
import useDeksState from "./hooks/useDeskState";
import { LocalStorage } from "app/shared/localstorage/impl/localStorage";
import { useEffect } from "react";
import { IRefreshTokenService } from "app/shared/services/interface/IRefreshTokenService";
import { AxiosRefreshTokenService } from "app/shared/services/AxiosRefreshTokenService";
import IStorageService from "app/shared/localstorage/interfaces/IStorageService";
import Fab from "app/shared/components/Fab/Fab";
import DeskForm from "./components/DeskForm/DeskForm";

import useSetDeskFormState from "./hooks/useSetDeskFormState";

export default function Desks() {
    const localStorage: IStorageService = new LocalStorage();
    const refreshTokenService: IRefreshTokenService = new AxiosRefreshTokenService();
    const axiosDeskService: IDeskService = new AxiosDeskService(localStorage, refreshTokenService);

    const [desks, setDesks] = useDeksState();
    const setIsFormOpen = useSetDeskFormState();

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
                key={desk.id}
                desk={desk} />
        )}
        <Fab onClick={async () => setIsFormOpen(true)} />
        <DeskForm onConfirmCallback={async (description) => {
            const newDesk = await axiosDeskService.create({
                description: description,
                available: true
            });
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            setDesks([...desks, newDesk!]);
            setIsFormOpen(false);
        }} />
    </section>;
}
