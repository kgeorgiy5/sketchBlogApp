import axios, { AxiosResponse, AxiosError } from "axios";

import getApiRoute from "../utils/getApiRoute";
import { complexCallbackType } from "../types/callbackTypes";

const useSignUp = (onSuccess: complexCallbackType<AxiosResponse>, onError: complexCallbackType<AxiosError>) => {
  const apiRoute = getApiRoute("sign-up")
  const sendRequest = (email: string, password: string) => {
    axios.post(apiRoute, { email: email, password: password }).then(res => {
      onSuccess(res);
    }).catch(err => {
      onError(err);
    });
  }

  return sendRequest;
};

export default useSignUp;
