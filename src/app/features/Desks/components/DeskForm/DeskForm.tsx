import classNames from "classnames";
import useDeskFormState from "../../hooks/useDeskFormState";
import styles from "./DeskForm.module.scss";
import DeskFormInput from "./DeskFormInput/DeskFormInput";
import { useState } from "react";


interface DeskFormProps {
    onConfirmCallback: (description: string) => void;
}

export default function DeskForm(props: DeskFormProps) {

    const [isOpen, setIsOpen] = useDeskFormState();
    const [formDescription, setFormDescription] = useState<string>("");

    const classes = classNames({
        [styles.dialog]: true,
        [styles.dialog__closed]: !isOpen
    });

    return <div className={classes}>
        <h3 className={styles.dialog__title}>
            Cadastro de Mesa
        </h3>
        <DeskFormInput name="description" value={formDescription} onChange={event => setFormDescription(event.target.value)} />
        <div className={styles.dialog__buttonBox}>
            <button
                style={{ backgroundColor: "#837EB1" }}
                className={styles.dialog__button}
                onClick={() => props.onConfirmCallback(formDescription)}
            >Confirmar</button>
            <button
                style={{ backgroundColor: "#ba4141" }}
                className={styles.dialog__button}
                onClick={() => setIsOpen(false)}
            >Cancelar</button>
        </div>
    </div>;
}