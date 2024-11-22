import axios, { AxiosResponse, AxiosError } from "axios";

import getApiRoute from "../../utils/getApiRoute.ts";
import { complexCallbackType } from "../../types/callbackTypes.ts";
import {useDispatch} from "react-redux";
import {setIsAuthenticated} from "../../reducers/authReducer.ts";

const useSignUp = (onSuccess: complexCallbackType<AxiosResponse>, onError: complexCallbackType<AxiosError>) => {
  const apiRoute = getApiRoute("sign-up")
  const dispatch = useDispatch();

  const sendRequest = (email: string, password: string) => {
    axios.post(apiRoute, { email: email, password: password }, {withCredentials:true}).then(res => {
      onSuccess(res);
      dispatch(setIsAuthenticated({isAuthenticated:true}));
    }).catch(err => {
      console.log(err);
      onError(err);
    });
  }

  return sendRequest;
};

export default useSignUp;