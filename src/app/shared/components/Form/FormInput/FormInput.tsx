import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from "react-hook-form";
import styles from "./FormInput.module.scss";

interface FormInputProps {
    name: string,
    value: string | number,
    readonly?: boolean,
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    register?: UseFormRegisterReturn,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorState?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
}

export default function FormInput(props: FormInputProps) {

    return <div className={styles.formInput}>
        <div className={styles.deskFormInput}>
            <label htmlFor={props.name}>{props.name} <span>{props.errorState ? props.errorState.message?.toString() : ""}</span></label>
            <input
                name={props.name}
                value={props.value}
                readOnly={props.readonly}
                {...props.register}
                onChange={props.onChange}
            />
        </div>
    </div>;
}