import { useState } from "react";
import { IoIosClose } from "react-icons/io";

import styles from "../styles/AuthModel.module.css";
import FormInput from "./FormInput";
import Button from "./Button";
import IAuthModelProps from "../types/IAuthModelProps";
import Backdrop from './Backdrop';

const AuthModel = ({ onClose }: IAuthModelProps) => {
  const [isRegistration, setIsRegistration] = useState<boolean>(false);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const closeModelHandler = () => {
    onClose();
  }

  const toggleRegistrationHandler = () => {
    setIsRegistration(prevState => !prevState);
  }

  const emailInputHandler = (e: string) => {
    setEmail(e);
  }
  const passwordInputHandler = (e: string) => {
    setPassword(e);
  }
  const confirmPasswordInputHandler = (e: string) => {
    setConfirmPassword(e);
  }

  return (
    <>
      <div className={` ${styles["auth-body"]} roll-out`}>
        <main className={styles["main"]}>
          <IoIosClose className={styles["close-button"]} onClick={closeModelHandler} />
          {isRegistration ? (
            <>
              <h1 className={styles["main-title"]}>Registration</h1>
              <form className={styles["form"]}>
                <FormInput label="Email" onChange={(e) => emailInputHandler(e)} />
                <FormInput label="Password" onChange={(e) => passwordInputHandler(e)} />
                <FormInput label="Confirm password" onChange={(e) => confirmPasswordInputHandler(e)} />
              </form>
              <div className={styles["toggle-block"]}>
                <Button onClick={toggleRegistrationHandler} variant="">Already have an account? Sign in!</Button>
              </div>
            </>
          ) : (
            <>
              <h1 className={styles["main-title"]}>Login</h1>
              <form className={styles["form"]}>
                <FormInput label="Email" onChange={(e) => emailInputHandler(e)} />
                <FormInput label="Password" onChange={(e) => passwordInputHandler(e)} />
              </form>
              <div className={styles["toggle-block"]}>
                <Button onClick={toggleRegistrationHandler} variant="">Do not have an account? Sign up!</Button>
              </div>
            </>
          )}
        </main>
      </div>
      <Backdrop onClick={closeModelHandler} />
    </>
  )

};

export default AuthModel;
