import getApiRoute from "../../utils/getApiRoute.ts";
import useError from "../useError.ts";
import axios, {AxiosError} from "axios";
import {useEffect, useState} from "react";

export interface IPostDetails{
    _id:string;
    title:string;
    text:string;
    content:string;
    numberOfLikes:number;
    email:string;
    updateDate:string;
}

const useGetPostDetails = (id:string|undefined) => {
    const errorHandler = useError();

    const [postDetails, setPostDetails] = useState<IPostDetails>();

    const sendRequest = () => {
        if(!id){
            const err = new Error("Post not found")
            errorHandler(err);
            return;
        }

        const endpoint = getApiRoute(`post/${id}`);

        axios.get(endpoint, {withCredentials:true}).then(res => {
            const postDetailsData:IPostDetails = {
                _id:res.data._id,
                title:res.data.title,
                text: res.data.text,
                content:res.data.content,
                numberOfLikes:res.data.numberOfLikes,
                email:res.data.email,
                updateDate:res.data.updateDate
            }
            setPostDetails(postDetailsData);
        }).catch((err:AxiosError) => {
            console.log(err);
            errorHandler(err);
        })
    }

    useEffect(() => {
        sendRequest();
    }, []);

    return postDetails;
}

export default useGetPostDetails;