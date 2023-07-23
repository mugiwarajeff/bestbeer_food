import AsideHeader from "./AsideHeader/AsideHeader";
import AsideMenu from "./AsideMenu/AsideMenu";
import styles from "./SideBar.module.scss";

export default function Sidebar(){
    return <aside className={styles.sideBar}>
        <AsideHeader/>
        <hr />
        <AsideMenu/>
    </aside>;
}