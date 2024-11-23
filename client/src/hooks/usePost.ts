import axios, {AxiosError, AxiosResponse} from "axios";
import { useState } from "react";

import getApiRoute from "../utils/getApiRoute";
import useError from "./useError.ts";

type State<T> = T | undefined;
type PostHook = (title: State<string>, content: State<Blob>) => [response: AxiosResponse | null, sendRequest: () => void];

const usePost: PostHook = (title, content) => {
  const errorHandler = useError();

  const endpoint = getApiRoute("create-post")
  const [response, setResponse] = useState<AxiosResponse | null>(null);

  const sendRequest = () => {
    if (!title || !content) {
      const err = new Error("Title or image is missing")
      errorHandler(err);
      setResponse(null);
      return;
    }

    const file = new File([content], "sketch.jpeg");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("sketch", file);

    axios.post(endpoint, formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        setResponse(res);
      }).catch((err:AxiosError) => {
        errorHandler(err);
        setResponse(null);
      })
  }

  return [response, sendRequest];
};

export default usePost;
