import axios, {AxiosError} from "axios";
import {useDispatch} from "react-redux";

import getApiRoute from "../../utils/getApiRoute.ts";
import {setIsAuthenticated} from "../../reducers/authReducer.ts";
import {useEffect} from "react";
import {setUserData} from "../../reducers/userReducer.ts";

const useCheckAuth = () => {
    const isAuthEndpoint = getApiRoute("is-auth");
    const userDataEndpoint = getApiRoute("user-data");
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(isAuthEndpoint, {withCredentials: true}).then(res => {
            dispatch(setIsAuthenticated({isAuthenticated:res.data.isAuth}));
            axios.get(userDataEndpoint, {withCredentials:true}).then(res => {
                dispatch(setUserData({email:res.data.email, userId:res.data._id}));
            })
        }).catch((err:AxiosError)=> {
            console.log(err);
        });
    }, []);
}

export default useCheckAuth;