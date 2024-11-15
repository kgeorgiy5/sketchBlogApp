import { genericCallbackType } from "../types/callbackTypes";

export default interface IErrorProps {
  message: string | undefined;
  onDelete: genericCallbackType;
}
