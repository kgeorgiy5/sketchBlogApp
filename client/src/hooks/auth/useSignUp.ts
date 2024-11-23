import axios, {AxiosError, AxiosResponse} from "axios";

import getApiRoute from "../../utils/getApiRoute.ts";
import {complexCallbackType} from "../../types/callbackTypes.ts";
import {useDispatch} from "react-redux";
import {setIsAuthenticated} from "../../reducers/authReducer.ts";
import useError from "../useError.ts";

const useSignUp = (onSuccess: complexCallbackType<AxiosResponse>) => {
  const dispatch = useDispatch();
  const errorHandler = useError();

  const apiRoute = getApiRoute("sign-up")

  return (email: string | undefined, password: string | undefined, confirmPassword: string | undefined) => {
    if (!email || !password) {
      const err = new Error("Email or password fields are empty");
      errorHandler(err);
      return;
    }

    if (password !== confirmPassword) {
      const err = new Error("Password and confirm password do not match")
      errorHandler(err);
      return;
    }

    axios.post(apiRoute, {email: email, password: password}, {withCredentials: true}).then(res => {
      dispatch(setIsAuthenticated({isAuthenticated: true}));
      onSuccess(res);
    }).catch((err: AxiosError) => {
      console.log(err);
      errorHandler(err);
    });
  };
};

export default useSignUp;