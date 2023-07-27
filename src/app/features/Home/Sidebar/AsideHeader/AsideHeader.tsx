import classNames from "classnames";
import styles from "./AsideHeader.module.scss";
import { FaUserAlt } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { getSidebarState, setSideBarState } from "../../hooks/UseSideBar";

export default function AsideHeader() {

    const setIsOpen = setSideBarState();
    const isOpen = getSidebarState();


    const asideHeaderIconStyles = classNames({
        [styles.asideHeader__icon]: true,
        [styles.close]: !isOpen,
    });

    const headerUserInfoStyles = classNames({
        [styles.asideHeader__userInfo]: true,
        [styles.close]: !isOpen
    });
    return <header className={styles.asideHeader}>
        <RiArrowGoBackFill
            color="white"
            size={24}
            onClick={() => setIsOpen(!isOpen)}
            style={{ transform: "rotate(0deg)" }}
            rotate={90} />
        <div className={asideHeaderIconStyles}>
            <FaUserAlt size={32} />
        </div>
        <div className={headerUserInfoStyles}>
            <h4>Jefferson Cerqueira</h4>
            <span>Gerente</span>
        </div>
    </header>;
}