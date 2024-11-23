import getApiRoute from "../utils/getApiRoute.ts";
import axios, {AxiosError} from "axios";
import useError from "./useError.ts";
import {genericCallbackType} from "../types/callbackTypes.ts";

const useLikePost = (postId:string, callback:genericCallbackType) => {
    const errorHandler = useError();

    const endpoint = getApiRoute("like-post")

    return () => {
        axios.put(endpoint, {postId:postId}, {withCredentials:true})
            .then(() => {
                callback();
            })
            .catch((err:AxiosError) => {
            errorHandler(err);
        })
    }
}

export default useLikePost;