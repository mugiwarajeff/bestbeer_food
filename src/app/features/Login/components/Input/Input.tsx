import { IconType } from "react-icons/lib";
import styles from "./Input.module.scss";
import classNames from "classnames";
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from "react-hook-form";


interface InputProps {
    Icon: IconType,
    inputType: string,
    placeHolder: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    register: UseFormRegisterReturn,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorState: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
}

export default function Input({ Icon, placeHolder, inputType, value, setValue, register, errorState }: InputProps) {

    const classes = classNames({
        [styles["input-container"]]: true,
        [styles.invalidated]: errorState ? true : false
    });
    return <div className={styles.container}>
        <div className={classes}>
            <div className={styles["input-container__icon"]}>
                <Icon color="black" size="32px" />
            </div>
            <input
                type={inputType}
                placeholder={placeHolder}
                value={value}
                {...register}
                onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) =>
                        setValue(event.target.value)
                }
            />
        </div>
        {errorState ?
            <p className={styles["error-message"]}>
                {errorState.message?.toString()}
            </p>
            : null
        }
    </div>;
}