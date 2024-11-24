import styles from "../styles/Button.module.css";
import { FC, ReactNode } from "react";
import { genericCallbackType } from "../types/callbackTypes";

interface IButton {
  children: ReactNode;
  onClick?: genericCallbackType;
  variant: "default" | "navbar" | "navbar--highlighted" | "toolbar" | "toolbar--highlighted" | "toolbar--success";
  disabled?: boolean;
  link?:string|null;
  filename?:string;
}

const Button: FC<IButton> = ({ children, onClick, variant, disabled = false, link = null, filename }) => {
  const buttonClickHandler = () => {
    if(onClick){
      onClick();
      return;
    }
  }

  return (
      <>
      {link ? (
          <a className={styles[variant]} href={link} download={filename}>
            {children}
          </a>
        ) : (
              <button className={styles[variant]} onClick={buttonClickHandler} disabled={disabled}>
                {children}
              </button>
  )
}
</>
)
};

export default Button;
