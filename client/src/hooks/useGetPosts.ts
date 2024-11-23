import axios, {AxiosError} from "axios";
import getApiRoute from "../utils/getApiRoute.ts";
import {useEffect, useState} from "react";
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

    const [posts, setPosts] = useState<Array<IPost>>([]);

    const endpoint = getApiRoute("posts");

    const sendRequest = () => {
        axios.get(endpoint).then((res) => {
            const data:Array<IPost> = res.data;
            setPosts(data);
        }).catch((err:AxiosError) => {
            errorHandler(err);
        })
    }

    useEffect(() => {
        sendRequest();
    }, []);

    return [posts, setPosts, sendRequest];
}

export default useGetPosts;