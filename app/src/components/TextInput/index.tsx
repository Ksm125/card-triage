import classNames from "classnames";
import { InputHTMLAttributes } from "react";
import styles from './styles.module.scss';

export const TextInput = ({className, ...restProps}: TextInputProps) => {

  return <input className={classNames(styles.textInput, className)} {...restProps} />;
};

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}
