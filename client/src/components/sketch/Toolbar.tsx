import { ChangeEvent, FC, useState } from "react";
import { LuBrush, LuEraser, LuPen } from "react-icons/lu";
import { PiNoteBlankBold } from "react-icons/pi";
import { FaCircle } from "react-icons/fa6";

import Button from "../Button";
import { BrushType, ILineConfig } from "./SketchCanvas";
import ColorPalette from "./ColorPalette";
import styles from "../../styles/sketch/Toolbar.module.css";
import { genericCallbackType } from "../../types/callbackTypes";

interface IToolbarProps {
  setLineColor: (color: string) => void;
  setLineWidth: (width: number) => void;
  setBrushType: (type: BrushType) => void;
  onClear: genericCallbackType;
  defaultLineConfig: ILineConfig;
}

const Toolbar: FC<IToolbarProps> = ({ setLineColor, setLineWidth, setBrushType, defaultLineConfig, onClear }) => {
  const widthBoundaries = { min: 5, max: 100 };
  const ERASER_COLOR = "#E2F1E7";

  const [color, setColor] = useState<string>(defaultLineConfig.lineColor);
  const [brush, setBrush] = useState<BrushType>(defaultLineConfig.brushType);
  const [width, setWidth] = useState<number>(defaultLineConfig.lineWidth);

  const [isErasing, setIsErasing] = useState<boolean>(false);

  const eraserHandler = () => {
    if (isErasing) {
      setLineColor(color);
      setIsErasing(false);
      return;
    }

    setBrushType("square");
    setBrush("square");
    setLineColor(ERASER_COLOR);
    setLineWidth(40);
    setWidth(40);
    setIsErasing(true);
  }

  const colorChangeHandler = (color: string) => {
    setIsErasing(false);
    setLineWidth(width);
    setColor(color);
    setLineColor(color);
  }

  const brushChangeHandler = (brush: BrushType) => {
    setBrushType(brush);
    setBrush(brush);
  }

  const widthChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setWidth(+event.target.value);
    setLineWidth(+event.target.value);
  }

  return (
    <div className={styles["toolbar"]}>

      <div className={styles['brush-type-buttons']}>
        <Button onClick={onClear} variant="toolbar"><PiNoteBlankBold size="1rem" /></Button>

        <Button
          variant={isErasing ? "toolbar--highlighted" : "toolbar"}
          onClick={eraserHandler}>
          <LuEraser size="1rem" />
        </Button>

        <Button
          variant={brush === "round" ? "toolbar--highlighted" : "toolbar"}
          onClick={() => brushChangeHandler("round")}>
          <LuPen size="1rem" />
        </Button>

        <Button
          variant={brush === "square" ? "toolbar--highlighted" : "toolbar"}
          onClick={() => brushChangeHandler("square")}>
          <LuBrush size="1rem" />
        </Button>

      </div>

      <div className={styles["width-selector"]}>
        <FaCircle size="1.2rem" />
        <input
          type="range" min={widthBoundaries.min}
          max={widthBoundaries.max} value={width}
          onChange={(e) => widthChangeHandler(e)}
          className={styles["slider"]} />
        <FaCircle size="0.6rem" />
      </div>

      <ColorPalette
        onChange={(color) => colorChangeHandler(color)}
        currentColor={color} />

    </div>
  )
}

export default Toolbar;
