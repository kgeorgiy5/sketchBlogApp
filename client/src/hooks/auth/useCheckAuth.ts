import axios, {AxiosError} from "axios";
import {useDispatch} from "react-redux";

import getApiRoute from "../../utils/getApiRoute.ts";
import {setIsAuthenticated} from "../../reducers/authReducer.ts";
import {useEffect} from "react";
import useError from "../useError.ts";

const useCheckAuth = () => {
    const endpoint = getApiRoute("is-auth");
    const dispatch = useDispatch();
    const errorHandler = useError();

    useEffect(() => {
        axios.get(endpoint, {withCredentials: true}).then(res => {
            dispatch(setIsAuthenticated({isAuthenticated:res.data.isAuth}));
        }).catch((err:AxiosError)=> {
            errorHandler(err);
        });
    }, []);
}

export default useCheckAuth;