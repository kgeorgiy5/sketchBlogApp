import { useEffect, useState } from "react";

import styles from "../styles/ErrorPopUp.module.css";
import IErrorProps from "../types/IErrorProps";

const ErrorPopUp = ({ message, onDelete }: IErrorProps) => {
  const [showError, setShowError] = useState<boolean>(true);

  useEffect(() => {
    const displayTimerId = setTimeout(() => {
      setShowError(false);
      onDelete();
    }, 5000)

    return () => clearTimeout(displayTimerId);
  }, [])

  return (
    <>
      {
        showError ? (

          <div className={`${styles["error"]} error-animation`} >
            <p className={styles["error-message"]}>{message}</p>
          </div >
        ) : null}
    </>
  );
};

export default ErrorPopUp;
