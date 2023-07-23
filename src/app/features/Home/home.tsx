import styles from "./Home.module.scss";
import Sidebar from "./Sidebar/SideBar";

export default function Home(){

    return <div className={styles.home}>
        <Sidebar/>
        <section className={styles.home__content}>
            <header>
                <h3>Bestes bier</h3>


            </header>
        </section>
    </div>;
}