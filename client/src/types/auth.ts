import { buttonCallbackType, genericCallbackType, complexCallbackType } from "./callbackTypes"

export interface IAuthFormContainer {
  onClose: buttonCallbackType,
  registration: boolean
}

export interface IAuthFormProps {
  onClose: genericCallbackType;
  setErrorMessage: complexCallbackType<string>;
  toggleAuth: genericCallbackType;
}
