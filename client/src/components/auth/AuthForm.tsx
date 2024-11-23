import { useState } from "react";
import { IoIosClose } from "react-icons/io";

import styles from "../../styles/AuthForm.module.css";
import { IAuthFormContainer } from "../../types/auth";
import Backdrop from '../Backdrop';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const AuthForm = ({ onClose, registration = false }: IAuthFormContainer) => {
  const [isRegistration, setIsRegistration] = useState<boolean>(registration);

  const closeModelHandler = () => {
    onClose();
  }

  const toggleRegistrationHandler = () => {
    setIsRegistration(prevState => !prevState);
  }

  return (
    <>
      <div className={` ${styles["auth-body"]} roll-out`}>
        <main className={styles["main"]}>
          <IoIosClose className={styles["close-button"]} onClick={closeModelHandler} />
          {isRegistration ? (
            <SignUpForm toggleAuth={toggleRegistrationHandler} onClose={onClose}  />
          ) : (
            <SignInForm toggleAuth={toggleRegistrationHandler} onClose={onClose}  />
          )}
        </main>
      </div>
      <Backdrop onClick={closeModelHandler} />
    </>
  )

};

export default AuthForm;
