import { FC, useEffect, useState } from "react";

import ErrorPopUp from "./ErrorPopUp";
import styles from "../styles/ErrorStack.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {setErrorMessage} from "../reducers/errorReducer.ts";

const ErrorStack: FC = () => {
  const dispatch = useDispatch();
  const message = useSelector((state:RootState) => state.error.errorMessage);

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
    dispatch(setErrorMessage({errorMessage:null}));
  }

  return (
    <div className={`${styles["error-stack"]} ${errors[0] ? "" : "hidden"}`}>
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
