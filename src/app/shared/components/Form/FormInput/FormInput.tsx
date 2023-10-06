import styles from "./FormInput.module.scss";

interface FormInputProps {
    name: string,
    value: string | number,
    readonly?: boolean,
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export default function FormInput(props: FormInputProps) {

    return <div className={styles.formInput}>
        <div className={styles.deskFormInput}>
            <label htmlFor={props.name}>{props.name}</label>
            <input type={props.name} value={props.value} onChange={props.onChange} readOnly={props.readonly} />
        </div>
    </div>;
}