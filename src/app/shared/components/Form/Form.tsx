import { ReactNode } from "react";
import styles from "./Form.module.scss";
import classNames from "classnames";
import React from "react";

interface FormProps {
    isOpen: boolean,
    title: string,
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined,
    onCancel: () => void,
    children?: ReactNode
}

export default function Form(props: FormProps) {

    const classes = classNames({ [styles.dialog]: true, [styles.dialog__closed]: !props.isOpen });

    return <div style={{ height: 160 + (React.Children.count(props.children) * 80) }} className={classes}>
        <h2 className={styles.dialog__title}>{props.title}</h2>
        <form action="" onSubmit={props.onSubmit}>
            {props.children}
            <div className={styles.dialog__buttonBox}>
                <button style={{ backgroundColor: "#837EB1" }} className={styles.dialog__button}>Confirmar</button>
                <button style={{ backgroundColor: "#ba4141" }} className={styles.dialog__button} type="reset" onClick={() => props.onCancel()}>Cancelar</button>
            </div>
        </form>
    </div>;
}