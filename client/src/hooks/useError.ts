import {AxiosError} from "axios";
import {useDispatch} from "react-redux";
import {setErrorMessage} from "../reducers/errorReducer.ts";

const useError = () => {
    const dispatch = useDispatch();

    return (error: Error | AxiosError) => {
        let errorMessage: string;

        if (error instanceof AxiosError) {
            errorMessage = error.response?.data.message || error.message;
        } else {
            errorMessage = error.message;
        }

        dispatch(setErrorMessage({errorMessage}));
    };
}

export default useError;