import getApiRoute from "../../utils/getApiRoute.ts";
import axios, { AxiosResponse, AxiosError } from "axios";
import { complexCallbackType } from "../../types/callbackTypes.ts";

const useSignIn = (onSuccess: complexCallbackType<AxiosResponse>, onError: complexCallbackType<AxiosError>) => {
  const apiRoute = getApiRoute("sign-ip")
  const sendRequest = (email: string, password: string) => {
    axios.post(apiRoute, { email: email, password: password }, {withCredentials:true}).then(res => {
      onSuccess(res);
    }).catch(err => {
      onError(err);
    });
  }

  return sendRequest;
};

export default useSignIn;
