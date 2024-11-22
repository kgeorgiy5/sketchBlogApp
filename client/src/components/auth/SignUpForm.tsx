import { useState } from "react";
import useSignUp from "../../hooks/auth/useSignUp.ts";
import { AxiosError } from "axios";
import FormInput from "../FormInput";
import Button from "../Button";
import styles from "../../styles/AuthForm.module.css";
import { IAuthFormProps } from "../../types/auth";

const SignUpForm = ({ toggleAuth, onClose, setErrorMessage }: IAuthFormProps) => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const emailInputHandler = (e: string) => {
    setEmail(e);
  }
  const passwordInputHandler = (e: string) => {
    setPassword(e);
  }
  const confirmPasswordInputHandler = (e: string) => {
    setConfirmPassword(e);
  }

  const signUpSuccessHandler = () => {
    onClose();
  }

  const signUpErrorHandler = (err: AxiosError) => {
    setErrorMessage(err.message);
  }

  const sendSignUpRequest = useSignUp(signUpSuccessHandler, signUpErrorHandler);

  const handleSignUp = () => {
    if (!email || !password) {
      setErrorMessage("Email or password fields are empty");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password and confirm password do not match");
      return;
    }

    sendSignUpRequest(email, password);
    return;
  }

  return (
    <form className={styles["form"]} onSubmit={(e) => e.preventDefault()}>
      <h1 className={styles["main-title"]}>Registration</h1>
      <FormInput isEmail={true} label="Email" onChange={(e) => emailInputHandler(e)} />
      <FormInput isPassword={true} label="Password" onChange={(e) => passwordInputHandler(e)} />
      <FormInput isPassword={true} label="Confirm password" onChange={(e) => confirmPasswordInputHandler(e)} />
      <div className={styles["toggle-block"]}>
        <Button onClick={handleSignUp} variant="default">Submit</Button>
        <Button onClick={toggleAuth} variant="default">Already have an account? Sign in!</Button>
      </div>
    </form>
  )
}

export default SignUpForm;
