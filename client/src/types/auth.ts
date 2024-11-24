import { buttonCallbackType, genericCallbackType } from "./callbackTypes"

export interface IAuthFormContainer {
  onClose: buttonCallbackType,
  registration: boolean
}

export interface IAuthFormProps {
  onClose: genericCallbackType;
  toggleAuth: genericCallbackType;
}
