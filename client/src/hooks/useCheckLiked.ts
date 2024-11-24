import getApiRoute from "../utils/getApiRoute.ts";
import axios, {AxiosError, AxiosResponse} from "axios";
import useError from "./useError.ts";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";

const useCheckLiked:(postId:string|undefined) => [boolean, Dispatch<SetStateAction<boolean>>] = (postId:string|undefined) => {
    const errorHandler = useError();

    const endpoint = getApiRoute("is-liked");

   const [isLiked, setIsLiked] = useState<boolean>(false);
    const isAuthenticated = useSelector((state:RootState) => state.isAuthenticated.isAuthenticated);

   const sendRequest = () => {
       if(!postId){
           const err = new Error("Post ID is undefined");
           errorHandler(err);
           return;
       }

       if(!isAuthenticated){
           setIsLiked(false);
           return;
       }

       axios.post(endpoint, {postId:postId}, {withCredentials: true})
           .then((res:AxiosResponse) => {
               const isLikedData:boolean = res.data;
               setIsLiked(isLikedData);
           })
           .catch((err:AxiosError) => {
               errorHandler(err);
           });
   }

    useEffect(() => {
        sendRequest();
    }, [isAuthenticated]);

   return [isLiked, setIsLiked];
}

export default useCheckLiked;