import axios, { AxiosResponse } from "axios";
import getApiRoute from "../utils/getApiRoute";
import { useState } from "react";
import { complexCallbackType } from "../types/callbackTypes";

type State<T> = T | undefined;
type PostHook = (title: State<string>, content: State<string>) => [response: AxiosResponse | null, errorMessage: string | null, setErrorMessage: complexCallbackType<string>, sendRequest: () => void];

const usePost: PostHook = (title, content) => {
  const endpoint = getApiRoute("create-post")
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendRequest = () => {
    if (!title || !content) {
      setErrorMessage("Wrong title/description/image");
      setResponse(null);
    }

    axios.post(endpoint, { title: title, content: content }).then(res => {
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
