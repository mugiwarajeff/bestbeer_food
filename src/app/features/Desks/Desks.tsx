import styles from "./Desks.module.scss";
import desks from "./Desks.json";
import DeskCard from "./components/DeskCard/DeskCard";
import classNames from "classnames";
import { getSidebarState } from "../Home/hooks/UseSideBar";

export default function Desks() {

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