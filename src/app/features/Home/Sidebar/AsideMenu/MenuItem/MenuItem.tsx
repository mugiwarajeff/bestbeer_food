import { IconType } from "react-icons";
import styles from "./MenuItem.module.scss";
import IModule from "app/features/Home/Interfaces/IModule";
import classNames from "classnames";
import { Link } from "react-router-dom";

interface MenuItemProprs {
    label: string,
    icon: IconType,
    navigateTo: string,
    selected: boolean,
    setModule: () => void
}

export default function MenuItem(props: MenuItemProprs) {

    const classes = classNames({
        [styles.menuItem] : true,
        [styles.selected] : props.selected
    });

    return <div 
            className={classes}
            onClick={() => props.setModule()}>
        <props.icon size={32}/>
        <li>
            <Link to={props.navigateTo} >
                {props.label}
            </Link>
        </li>
    </div>;
}