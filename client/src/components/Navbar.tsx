import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import Button from "./Button";
import AuthModel from "./AuthModel";

const Navbar = ({ onRedirection }: any) => {

  const [isAuthShown, setIsAuthShown] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isRegistration, setIsRegistration] = useState<boolean>(false);

  const navigationButtonHandler = (path: string) => {

  }

  const handleSignInButton = () => {
    setIsRegistration(false);
    setIsAuthShown(true);
  }

  const handleSignUpButton = () => {
    setIsAuthShown(() => {
      setIsRegistration(true);
      return true
    })
  }

  const handleLogoutButton = () => {
    setIsAuthShown(false);
  }

  const handleAuthModelClose = () => {
    setIsAuthShown(false);
  }

  return (
    <>
      <nav className={styles["navbar"]}>
        <div className={styles["logo-area"]}>
          {/* <img alt="logo" src="../../public/download (1).png" className={styles["logo"]} /> */}
          <h1 className={styles["logo"]}>Blog App</h1>
        </div>
        <div className={styles["navbar-buttons"]}>
          <div className={styles["redirect-buttons"]}>
            <Button variant="button-navbar--highlighted" onClick={() => navigationButtonHandler("feed")} >Feed</Button>
            <Button variant="button-navbar" onClick={() => navigationButtonHandler("my-posts")}>My posts</Button>
            <Button variant="button-navbar" onClick={() => navigationButtonHandler("my-posts")}>Write a new post</Button>
          </div>
          <div className={styles["auth-buttons"]}>
            {isLogged ? (
              <>
                <Button variant="button-navbar" onClick={handleLogoutButton} >Logout</Button>
              </>) : (
              <>
                <Button variant="button-navbar" onClick={handleSignInButton} >Sign In</Button>
                <Button variant="button-navbar" onClick={handleSignUpButton} >Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </nav>
      {isAuthShown ? (
        <>
          <AuthModel registration={isRegistration} onClose={handleAuthModelClose} />
        </>
      ) : null}
    </>
  );

};

export default Navbar;
