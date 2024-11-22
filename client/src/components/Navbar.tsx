import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import Button from "./Button";
import AuthForm from "./auth/AuthForm.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {setIsAuthenticated} from "../reducers/authReducer.ts";
import useLogout from "../hooks/auth/useLogout.ts";

const Navbar = () => {
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sendLogoutRequest = useLogout();

  const isAuth = useSelector((state:RootState) => state.isAuthenticated.isAuthenticated);

  const [isAuthShown, setIsAuthShown] = useState<boolean>(false);
  const [isRegistration, setIsRegistration] = useState<boolean>(false);

  const navigationButtonHandler = (path: string) => {
    navigate(`/${path}`);
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
    sendLogoutRequest().then((res) => {
      console.log(res)
      dispatch(setIsAuthenticated({isAuthenticated: false}));
    });
  }

  const handleAuthModelClose = () => {
    setIsAuthShown(false);
  }

  return (
    <>
      <nav className={styles["navbar"]}>
        <div className={styles["logo-area"]}>
          {/* <img alt="logo" src="../../public/download (1).png" className={styles["logo"]} /> */}
          <h1 className={styles["logo"]}>sketchBlog</h1>
        </div>
        <div className={styles["navbar-buttons"]}>
          <div className={styles["redirect-buttons"]}>
            <Button variant={`${currentPath === "/" ? "navbar--highlighted" : "navbar"}`} onClick={() => navigationButtonHandler("")} >Feed</Button>
            {isAuth ? (
                <>
                  <Button variant={`${currentPath === "/my-posts" ? "navbar--highlighted" : "navbar"}`} onClick={() => navigationButtonHandler("my-posts")}>My posts</Button>
                  <Button variant={`${currentPath === "/sketch" ? "navbar--highlighted" : "navbar"}`} onClick={() => navigationButtonHandler("sketch")}>Sketch</Button>
                </>
            ): null}
          </div>
          <div className={styles["auth-buttons"]}>
            {isAuth ? (
              <>
                <Button variant="navbar" onClick={handleLogoutButton} >Logout</Button>
              </>) : (
              <>
                <Button variant="navbar" onClick={handleSignInButton} >Sign In</Button>
                <Button variant="navbar" onClick={handleSignUpButton} >Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </nav>
      {isAuthShown ? (
        <>
          <AuthForm registration={isRegistration} onClose={handleAuthModelClose} />
        </>
      ) : null}
    </>
  );

};

export default Navbar;
