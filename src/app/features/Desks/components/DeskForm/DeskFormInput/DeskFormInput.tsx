import styles from "./DeskFormInput.module.scss";

interface DeskFormInputProps {
    name: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export default function DeskFormInput(props: DeskFormInputProps) {

    return <div className={styles.deskFormInput}>
        <label htmlFor={props.name}>{props.name}</label>
        <input type={props.name} value={props.value} onChange={props.onChange} />
    </div>;
}