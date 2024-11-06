import { useState } from "react";
import styles from "../styles/FormInput.module.css";
import IFormInputProps from "../types/IFormInputProps";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const FormInput = ({ label, onChange, isPassword, isEmail }: IFormInputProps) => {

  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(!!isPassword);

  const inputChangeHandler = (e: string) => {
    onChange(e);
  }

  const showPasswordHandler = () => {
    setIsPasswordHidden(prevState => !prevState);
  }

  const getInputType = () => {
    if (isPasswordHidden) {
      return "password";
    } else if (isEmail) {
      return "email";
    } else {
      "text";
    }
  }

  return (
    <>
      <main className={styles["main"]}>
        <label className={styles["label"]} htmlFor={label}>{label}:</label>
        <div className={styles["input-block"]}>
          <input id={label} className={styles["input-field"]} type={getInputType()} onChange={(e) => inputChangeHandler(e.target.value)} />
          {isPassword ? (
            <>
              {isPasswordHidden ? (
                <FaRegEye onClick={showPasswordHandler} className={styles["show-password-button"]} />
              ) : (
                <FaRegEyeSlash onClick={showPasswordHandler} className={styles["show-password-button"]} />
              )}
            </>
          ) : null}
        </div>
      </main >
    </>
  )
};

export default FormInput;
