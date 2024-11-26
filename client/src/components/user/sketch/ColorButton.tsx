import { FC } from "react";

import { complexCallbackType } from "../../../types/callbackTypes.ts";
import styles from "../../../styles/user/sketch/ColorButton.module.css";

interface IColorButton {
  onClick: complexCallbackType<string>;
  color: string;
  isSelected: boolean;
}

const ColorButton: FC<IColorButton> = ({ onClick, color, isSelected }) => {

  const buttonClickHandler = () => {
    onClick(color);
  }

  return (
    <>
      <button onClick={buttonClickHandler}
        className={`${isSelected ? styles["color-button--selected"] : styles["color-button"]} ${styles[color]}`}></button>
    </>
  )
}

export default ColorButton;
