import getApiRoute from "../../utils/getApiRoute.ts";
import axios, { AxiosResponse, AxiosError } from "axios";
import { complexCallbackType } from "../../types/callbackTypes.ts";
import {useDispatch} from "react-redux";
import {setIsAuthenticated} from "../../reducers/authReducer.ts";
import useError from "../useError.ts";
import {setUserData} from "../../reducers/userReducer.ts";

const useSignIn = (onSuccess: complexCallbackType<AxiosResponse>) => {
  const dispatch = useDispatch();
  const errorHandler = useError();

  const apiRoute = getApiRoute("sign-in")

 return (email: string|undefined, password: string|undefined) => {
      if(!email || !password){
          const err = new Error("Email or password field is empty")
          errorHandler(err);
          return;
      }

    axios.post(apiRoute, { email: email, password: password }, {withCredentials:true}).then(res => {
      dispatch(setIsAuthenticated({isAuthenticated:true}));
      console.log(res);
      const email:string = res.data.email || "";
      const userId:string = res.data._id || "";

      dispatch(setUserData({email:email, userId:userId}));
      onSuccess(res);
    }).catch((err:AxiosError) => {
      errorHandler(err);
    });
  }
};

export default useSignIn;
