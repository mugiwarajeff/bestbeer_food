import styles from "./FormSwitch.module.scss";
import Switch from "react-switch";
interface FormSwitchProps {
    name: string,
    activate: boolean
    onChange: () => void
}

export default function FormSwitch(props: FormSwitchProps) {

    return <div className={styles.switch}>
        <label htmlFor={props.name}>{props.name}</label>
        <Switch id={props.name} checked={props.activate} onChange={props.onChange} />
    </div>;

}