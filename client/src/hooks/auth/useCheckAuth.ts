import axios from "axios";
import {useDispatch} from "react-redux";

import getApiRoute from "../../utils/getApiRoute.ts";
import {setIsAuthenticated} from "../../reducers/authReducer.ts";
import {useEffect} from "react";

const useCheckAuth = () => {
    const endpoint = getApiRoute("is-auth");
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(endpoint, {withCredentials: true}).then(res => {
            dispatch(setIsAuthenticated({isAuthenticated:res.data.isAuth}));
        }).catch(err => console.log(err));
    }, []);
}

export default useCheckAuth;