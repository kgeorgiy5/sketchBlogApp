import getApiRoute from "../../utils/getApiRoute.ts";
import axios, {AxiosError} from "axios";
import useError from "../useError.ts";
import {useDispatch} from "react-redux";
import {setIsAuthenticated} from "../../reducers/authReducer.ts";

const useLogout = () => {
    const endpoint = getApiRoute("logout");
    const errorHandler = useError();
    const dispatch = useDispatch();

    return () => {
        axios.post(endpoint, {withCredentials: true}).then(() => {
            dispatch(setIsAuthenticated({isAuthenticated:false}));
        })
            .catch((err:AxiosError) => {
                errorHandler(err);
            });
    }
};

export default useLogout;