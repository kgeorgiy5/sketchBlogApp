import axios, {AxiosError, AxiosResponse} from "axios";
import getApiRoute from "../utils/getApiRoute.ts";
import {useCallback, useEffect, useState} from "react";
import useError from "./useError.ts";

export interface IPost{
    _id: string;
    title: string;
    content: string;
    userId: string;
    updatedAt: string;
    numberOfLikes:number;
}

const useGetPosts = () => {
    const errorHandler = useError();

    const [posts, setPosts] = useState<IPost[]>([]);

    const endpoint = getApiRoute("posts");

    const sendRequest = useCallback(() => {
        axios.get(endpoint).then((res:AxiosResponse) => {
            const data:IPost[] = res.data;
            setPosts(data);
        }).catch((err:AxiosError) => {
            errorHandler(err);
        })
    }, [endpoint, errorHandler]);

    useEffect(() => {
        sendRequest();
    }, []);

    return posts;
}

export default useGetPosts;