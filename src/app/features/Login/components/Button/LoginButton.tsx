import styles from "./LoginButton.module.scss";

interface buttonProps {

    label: string
}

export default function LoginButton(props: buttonProps) {

    return <div className={styles.login_button}>
        <button
            type={"submit"}
        >{props.label}</button>
    </div>;
}