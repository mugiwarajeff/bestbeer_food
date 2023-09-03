import styles from "./Desks.module.scss";
import DeskCard from "./components/DeskCard/DeskCard";
import classNames from "classnames";
import { getSidebarState } from "../Home/hooks/UseSideBar";
import { IDesk } from "./interfaces/IDesk";
import { IDeskService } from "./interfaces/IDeskService";
import { AxiosDeskService } from "./services/axiosDeskService";
import useDeksState from "./hooks/useDeskState";
import { LocalStorage } from "app/shared/localstorage/impl/localStorage";

export default function Desks() {
    const axiosDeskService : IDeskService = new AxiosDeskService(new LocalStorage);
    const [desks, setDesks] = useDeksState();

    axiosDeskService.getAllDesks().then((desks: IDesk[]) => {
        setDesks(desks);
    });

    const isOpen = getSidebarState();
    const classes = classNames({
        [styles.desks]: true,
        [styles.desks__open]: !isOpen
    });

    return <section className={classes}>
        {desks.map(
            (desk) => <DeskCard
                key={desk.id}
                desk={desk} />
        )}
    </section>;
}