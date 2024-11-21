import axios, { AxiosResponse } from "axios";
import getApiRoute from "../utils/getApiRoute";
import { useState } from "react";
import { complexCallbackType } from "../types/callbackTypes";

type State<T> = T | undefined;
type PostHook = (title: State<string>, content: State<Blob>) => [response: AxiosResponse | null, errorMessage: string | null, setErrorMessage: complexCallbackType<string>, sendRequest: () => void];

const usePost: PostHook = (title, content) => {
  const endpoint = getApiRoute("create-post")
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendRequest = () => {
    if (!title || !content) {
      setErrorMessage("Wrong title/image");
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
        setErrorMessage(null);
      }).catch(err => {
        setErrorMessage(err.message);
        setResponse(null);
      })


  }

  return [response, errorMessage, setErrorMessage, sendRequest];
};

export default usePost;
