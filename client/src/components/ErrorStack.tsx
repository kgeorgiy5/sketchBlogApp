import { useEffect, useState } from "react";

import ErrorPopUp from "./ErrorPopUp";
import styles from "../styles/ErrorStack.module.css";

const ErrorStack = ({ message }: { message: string }) => {

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (message) {
      setErrors(prevState => [...prevState, message]);
    }
  }, [message]);

  const handleFirstRemoval = () => {
    setErrors(prevState => {
      prevState.shift();
      return prevState;
    })
  }

  return (
    <div className={styles["error-stack"]}>
      {errors[0] ? (
        <>
          {errors.map(errorMsg => (
            <ErrorPopUp key={errorMsg} message={errorMsg} onDelete={handleFirstRemoval} />
          ))}
        </>
      ) : null}
    </div>
  )

};

export default ErrorStack;
