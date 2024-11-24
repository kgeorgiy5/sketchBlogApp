import getApiRoute from "../utils/getApiRoute.ts";
import axios, {AxiosError, AxiosResponse} from "axios";
import useError from "./useError.ts";
import {useEffect, useState} from "react";
import {IPost} from "./useGetPosts.ts";

const useGetLikedPosts:()=>[likedPosts:IPost[], sendRequest:() => void] = () => {
    const errorHandler = useError();

    const endpoint = getApiRoute("my-likes");

    const [likedPosts, setLikedPosts] = useState<IPost[]>([]);

    function sendRequest () {
        axios.get(endpoint, {withCredentials:true})
        .then((res:AxiosResponse) => {
            setLikedPosts(res.data);
        })
        .catch((err:AxiosError) => {
            errorHandler(err);
        })
    }

    useEffect(() => {
        sendRequest();
    }, []);

    return [likedPosts, sendRequest];
}

export default useGetLikedPosts;