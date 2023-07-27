import { IconType } from "react-icons";
import styles from "./MenuItem.module.scss";

import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { getSidebarState } from "app/features/Home/hooks/UseSideBar";

interface MenuItemProprs {
    label: string,
    icon: IconType,
    navigateTo: string,
    selected: boolean,
    setModule: () => void
}

export default function MenuItem(props: MenuItemProprs) {

    const isOpen = getSidebarState();

    const classes = classNames({
        [styles.menuItem]: true,
        [styles.selected]: props.selected,
        [styles.close]: !isOpen
    });



    const navigateTo = useNavigate();

    return <div
        className={classes}
        onClick={
            () => {
                props.setModule();
                navigateTo(props.navigateTo);
            }
        }>
        <props.icon size={32} />
        <li>
            {props.label}
        </li>
    </div>;
}