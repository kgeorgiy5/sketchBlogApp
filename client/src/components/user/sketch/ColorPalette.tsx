import { FC, ChangeEvent } from "react";

import { complexCallbackType } from "../../../types/callbackTypes.ts";
import ColorButton from "./ColorButton.tsx";
import styles from "../../../styles/user/sketch/ColorPalette.module.css";

interface IColorPalette {
  onChange: complexCallbackType<string>;
  currentColor: string;
}

const ColorPalette: FC<IColorPalette> = ({ onChange, currentColor }) => {
  const handleColorInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }

  return (
    <div className={styles["color-palette"]}>
      <label htmlFor="color-pick" className={styles["color-input"]}>
        <input id="color-pick" className={styles["hidden"]} onChange={(e) => handleColorInputChange(e)} type="color" />
      </label>
      <ColorButton color="red" onClick={() => onChange("red")} isSelected={currentColor === "red"} />
      <ColorButton color="orange" onClick={() => onChange("orange")} isSelected={currentColor === "orange"} />
      <ColorButton color="yellow" onClick={() => onChange("yellow")} isSelected={currentColor === "yellow"} />
      <ColorButton color="green" onClick={() => onChange("green")} isSelected={currentColor === "green"} />
      <ColorButton color="blue" onClick={() => onChange("blue")} isSelected={currentColor === "blue"} />
      <ColorButton color="pink" onClick={() => onChange("pink")} isSelected={currentColor === "pink"} />
      <ColorButton color="purple" onClick={() => onChange("purple")} isSelected={currentColor === "purple"} />
      <ColorButton color="black" onClick={() => onChange("black")} isSelected={currentColor === "black"} />
    </div>
  )
};

export default ColorPalette;
