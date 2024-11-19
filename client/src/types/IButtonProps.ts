import { ReactNode } from "react";
import { buttonCallbackType } from "./callbackTypes";

interface IButtonProps {
  children: ReactNode,
  onClick: buttonCallbackType,
  variant: string,
  disabled?: boolean
}

export default IButtonProps;
