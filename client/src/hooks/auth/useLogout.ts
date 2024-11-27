import getApiRoute from "../../utils/getApiRoute.ts";
import axios, {AxiosError} from "axios";
import useError from "../useError.ts";
import {useDispatch} from "react-redux";
import {setIsAuthenticated} from "../../reducers/authReducer.ts";
import {setUserData} from "../../reducers/userReducer.ts";

const useLogout = () => {
    const endpoint = getApiRoute("logout");
    const errorHandler = useError();
    const dispatch = useDispatch();

    return () => {
        axios.get(endpoint, {withCredentials: true}).then(() => {
            dispatch(setIsAuthenticated({isAuthenticated:false}));
            dispatch(setUserData({email:"", userId:""}));
        })
            .catch((err:AxiosError) => {
                errorHandler(err);
            });
    }
};

export default useLogout;