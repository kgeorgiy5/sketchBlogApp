import getApiRoute from "../utils/getApiRoute.ts";
import axios, {AxiosError, AxiosResponse} from "axios";
import useError from "./useError.ts";
import {complexCallbackType} from "../types/callbackTypes.ts";

const useLikePost = (postId:string, callback:complexCallbackType<number>) => {
    const errorHandler = useError();

    const endpoint = getApiRoute("like-post")

    return () => {
        axios.put(endpoint, {postId:postId}, {withCredentials:true})
            .then((res:AxiosResponse) => {
                const numberOfLikes = res.data.numberOfLikes;
                callback(numberOfLikes);
            })
            .catch((err:AxiosError) => {
            errorHandler(err);
        })
    }
}

export default useLikePost;