import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import styles from "./FormSelection.module.scss";

interface FormSelecionProps {
    name: string,
    value: string | number,
    onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined,
    errorState?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
    values: string[] | number[]
}

export default function FormSelecion({name, onChange, value, errorState, values}: FormSelecionProps){
    return <div className={styles.formSelection}>
        <label htmlFor={name}>{name} <span>{errorState ? errorState.message?.toString() : ""}</span></label>
        <select 
            name={name} 
            id={name} 
            value={value}
            onChange={onChange} >
            {values.map(value => <option 
                key={value.toString()}
                value={value}>{value}</option>)}
        </select>
    </div>;
}