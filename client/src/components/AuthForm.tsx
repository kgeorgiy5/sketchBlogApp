import { useState } from "react";
import { IoIosClose } from "react-icons/io";

import styles from "../styles/AuthModel.module.css";
import FormInput from "./FormInput";
import Button from "./Button";
import IAuthFormProps from "../types/IAuthFormProps";
import Backdrop from './Backdrop';

const AuthForm = ({ onClose, registration = false }: IAuthModelProps) => {
  const [isRegistration, setIsRegistration] = useState<boolean>(registration);

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

  const handleSubmit = () => {
    console.log(email, password, confirmPassword);
  }

  return (
    <>
      <div className={` ${styles["auth-body"]} roll-out`}>
        <main className={styles["main"]}>
          <IoIosClose className={styles["close-button"]} onClick={closeModelHandler} />
          {isRegistration ? (
            <form className={styles["form"]}>
              <h1 className={styles["main-title"]}>Registration</h1>
              <FormInput isEmail={true} label="Email" onChange={(e) => emailInputHandler(e)} />
              <FormInput isPassword={true} label="Password" onChange={(e) => passwordInputHandler(e)} />
              <FormInput isPassword={true} label="Confirm password" onChange={(e) => confirmPasswordInputHandler(e)} />
              <div className={styles["toggle-block"]}>
                <Button onClick={handleSubmit} variant="button-default">Submit</Button>
                <Button onClick={toggleRegistrationHandler} variant="button-default">Already have an account? Sign in!</Button>
              </div>
            </form>
          ) : (
            <form className={styles["form"]}>
              <h1 className={styles["main-title"]}>Login</h1>
              <FormInput isPassword={false} label="Email" onChange={(e) => emailInputHandler(e)} />
              <FormInput isPassword={true} label="Password" onChange={(e) => passwordInputHandler(e)} />
              <div className={styles["toggle-block"]}>
                <Button onClick={handleSubmit} variant="button-default">Submit</Button>
                <Button onClick={toggleRegistrationHandler} variant="button-default">Do not have an account? Sign up!</Button>
              </div>
            </form>
          )}
        </main>
      </div>
      <Backdrop onClick={closeModelHandler} />
    </>
  )

};

export default AuthForm;
