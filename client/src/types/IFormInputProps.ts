import { inputChangeCallbackType } from "./callbackTypes";

export default interface IFormInputProps {
  label: string,
  onChange: inputChangeCallbackType,
  isPassword?: boolean,
  isEmail?: boolean,
}
