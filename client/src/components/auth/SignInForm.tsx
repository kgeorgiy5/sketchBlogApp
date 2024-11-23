import { useState } from "react";

import { IAuthFormProps } from "../../types/auth";
import FormInput from "../FormInput";
import Button from "../Button";
import styles from "../../styles/AuthForm.module.css";
import useSignIn from "../../hooks/auth/useSignIn.ts";

const SignInForm = ({ onClose, toggleAuth}: IAuthFormProps) => {
  const sendSignIn = useSignIn(() => {
    onClose();
  });

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const emailInputHandler = (e: string) => {
    setEmail(e);
  }
  const passwordInputHandler = (e: string) => {
    setPassword(e);
  }

  const handleSignIn = () => {
    sendSignIn(email, password);
    return;
  }

  return (

    <form className={styles["form"]} onSubmit={(e) => e.preventDefault()}>
      <h1 className={styles["main-title"]}>Login</h1>
      <FormInput isPassword={false} label="Email" onChange={(e) => emailInputHandler(e)} />
      <FormInput isPassword={true} label="Password" onChange={(e) => passwordInputHandler(e)} />
      <div className={styles["toggle-block"]}>
        <Button onClick={handleSignIn} variant="default">Submit</Button>
        <Button onClick={toggleAuth} variant="default">Do not have an account? Sign up!</Button>
      </div>
    </form>
  )

};

export default SignInForm;
