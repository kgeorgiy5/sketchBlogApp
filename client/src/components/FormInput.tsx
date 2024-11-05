import styles from "../styles/FormInput.module.css";
import IFormInputProps from "../types/IFormInputProps";

const FormInput = ({ label, onChange }: IFormInputProps) => {

  const inputChangeHandler = (e: string) => {
    onChange(e);
  }

  return (
    <>
      <div className={styles["input-block"]}>
        <label htmlFor="input">{label}</label>
        <input id="input" onChange={(e) => inputChangeHandler(e.target.value)} />
      </div>
    </>
  )
};

export default FormInput;
