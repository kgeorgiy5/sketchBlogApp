import IButtonProps from "../types/IButtonProps";
import styles from "../styles/Button.module.css";

const Button = ({ children, onClick, variant }: IButtonProps) => {


  const buttonClickHandler = () => {
    onClick();
  }

  return (
    <button className={styles[variant]} onClick={buttonClickHandler} >
      {children}
    </button >
  )
};

export default Button;
