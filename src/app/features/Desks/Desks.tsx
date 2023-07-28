import styles from "./Desks.module.scss";
import desks from "./Desks.json";
import DeskCard from "./components/DeskCard/DeskCard";

export default function Desks() {

        
    return <section className={styles.desks}>
        {desks.map( 
            (desk) => <DeskCard 
                key={desk.id}
                desk={desk}/>
                )}
    </section>;
}