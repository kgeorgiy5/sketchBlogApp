import styles from "../styles/Backdrop.module.css";
import IBackdropProps from "../types/IBackdropProps";

const Backdrop = ({ onClick }: IBackdropProps) => {
  const backdropClickHandler = () => {
    onClick();
  }

  return (
    <>
      <div className={styles["backdrop"]} onClick={backdropClickHandler}>
      </div>
    </>
  )
};

export default Backdrop;
