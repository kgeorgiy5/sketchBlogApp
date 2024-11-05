import { ReactNode } from "react";
import { buttonCallbackType } from "./callbackTypes";

interface IButtonProps {
  children: ReactNode,
  onClick: buttonCallbackType,
  variant: string
}

export default IButtonProps;
