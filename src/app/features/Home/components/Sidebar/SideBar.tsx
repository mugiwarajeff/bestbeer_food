import { getSidebarState } from "../../hooks/UseSideBar";
import AsideHeader from "./AsideHeader/AsideHeader";
import AsideMenu from "./AsideMenu/AsideMenu";
import styles from "./SideBar.module.scss";
import classNames from "classnames";


export default function Sidebar() {

    const isOpen = getSidebarState();

    const classes = classNames({
        [styles.sideBar]: true,
        [styles.sideBar__open]: isOpen,
        [styles.sideBar__close]: !isOpen
    });

    return <aside className={classes}>
        <AsideHeader />
        <hr />
        <AsideMenu />
    </aside>;
}