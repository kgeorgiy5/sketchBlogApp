import getApiRoute from "../../utils/getApiRoute.ts";
import axios, {AxiosError} from "axios";
import useError from "../useError.ts";

const useDeletePost = (postId: string) => {
    const errorHandler = useError();
    const endpoint = getApiRoute(`delete-post/${postId}`);

    return () => {
        axios.delete(endpoint, {
            withCredentials: true
        }).then(() => {
            window.location.reload();
        }).catch((err:AxiosError) => {
            errorHandler(err);
        })
    }
}

export default useDeletePost;