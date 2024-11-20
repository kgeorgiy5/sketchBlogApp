import styles from "../styles/Button.module.css";
import { FC, ReactNode } from "react";
import { genericCallbackType } from "../types/callbackTypes";

interface IButton {
  children: ReactNode;
  onClick: genericCallbackType;
  variant: "default" | "navbar" | "navbar--highlighted" | "toolbar" | "toolbar--highlighted" | "toolbar--success";
  disabled?: boolean;
}

const Button: FC<IButton> = ({ children, onClick, variant, disabled = false }) => {


  const buttonClickHandler = () => {
    onClick();
  }

  return (
    <button className={styles[variant]} onClick={buttonClickHandler} disabled={disabled} >
      {children}
    </button >
  )
};

export default Button;
