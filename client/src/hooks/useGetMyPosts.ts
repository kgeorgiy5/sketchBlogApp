import getApiRoute from "../utils/getApiRoute.ts";
import useError from "./useError.ts";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";

export interface IPost{
    _id: string;
    title: string;
    content: string;
    userId: string;
    updatedAt: string;
    numberOfLikes:number;
}

const useGetMyPosts = () => {
    const errorHandler = useError();

    const [posts, setPosts] = useState<Array<IPost>>([]);

    const endpoint = getApiRoute("my-posts");

    const sendRequest = () => {
        axios.get(endpoint, {withCredentials:true}).then((res) => {
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

export default useGetMyPosts;