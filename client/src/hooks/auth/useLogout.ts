import getApiRoute from "../../utils/getApiRoute.ts";
import axios from "axios";

const useLogout = () => {
    const endpoint = getApiRoute("logout");
    //TODO: Add error handling

    function sendRequest() {
        return axios.post(endpoint, {withCredentials: true})
            .catch(() => {

            });
    }

    return sendRequest;
};

export default useLogout;