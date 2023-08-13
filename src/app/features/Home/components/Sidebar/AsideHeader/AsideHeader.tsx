import classNames from "classnames";
import styles from "./AsideHeader.module.scss";
import { FaUserAlt } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { getSidebarState, setSideBarState } from "../../../hooks/UseSideBar";
import { useCurrentUser } from "app/shared/hooks/useCurrentUser";
import { FaTruckRampBox } from "react-icons/fa6";

export default function AsideHeader() {

    const setIsOpen = setSideBarState();
    const isOpen = getSidebarState();
    const currentUser = useCurrentUser();

    const headerClasses = classNames({
        [styles.asideHeader] : true,
        [styles.asideHeader__close]: !isOpen
    });

    const toggleButtonClasses = classNames({
        [styles.asideHeader__toggleButton]: true,
        [styles.asideHeader__toggleButton__open]: !isOpen
    });

    const asideHeaderIconStyles = classNames({
        [styles.asideHeader__icon]: true,
        [styles.close]: !isOpen,

    });
    const headerUserInfoStyles = classNames({
        [styles.asideHeader__userInfo]: true,
        [styles.close]: !isOpen
    });

    return <header className={headerClasses}>
        <div className={toggleButtonClasses}>
            <RiArrowGoBackFill

                size={24}
                onClick={() => setIsOpen(!isOpen)}
                style={{ transform: "rotate(0deg)", }}
            />
        </div>
        <div className={asideHeaderIconStyles}>
            <FaUserAlt size={32} />
        </div>
        <div className={headerUserInfoStyles}>
            <h4>{currentUser.name}</h4>
            <span>{currentUser.role}</span>
        </div>
    </header>;
}