import { useEffect, useState } from "react";

import ErrorPopUp from "./ErrorPopUp";
import styles from "../styles/ErrorStack.module.css";
import { complexCallbackType } from "../types/callbackTypes";

const ErrorStack = ({ message, setMessage }: { message: string | undefined, setMessage: complexCallbackType<string> }) => {

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
    setMessage("");
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
