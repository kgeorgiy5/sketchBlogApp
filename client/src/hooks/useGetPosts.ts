import axios from "axios";
import getApiRoute from "../utils/getApiRoute.ts";
import {useEffect, useState} from "react";

export interface IPost{
    _id: string;
    title: string;
    content: string;
    userId: string;
    updatedAt: string;
    numberOfLikes:number;
}

const useGetPosts = () => {
    const [posts, setPosts] = useState<IPost[]>([]);

    const endpoint = getApiRoute("posts");

    const sendRequest = () => {
        axios.get(endpoint).then((res) => {
            const data:IPost[] = res.data;
            setPosts(data);
        })
    }

    useEffect(() => {
        sendRequest();
    }, []);

    return [posts, setPosts, sendRequest];
}

export default useGetPosts;