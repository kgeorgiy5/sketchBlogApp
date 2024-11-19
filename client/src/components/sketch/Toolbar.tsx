import { ChangeEvent, FC, useEffect, useState } from "react";
import Button from "../Button";
import { BrushType, ILineConfig } from "./SketchCanvas";

interface IToolbarProps {
  setLineColor: (color: string) => void;
  setLineWidth: (width: number) => void;
  setBrushType: (type: BrushType) => void;
  defaultLineConfig: ILineConfig;
}

const Toolbar: FC<IToolbarProps> = ({ setLineColor, setLineWidth, setBrushType, defaultLineConfig }) => {
  const widthBoudaries = { min: 5, max: 50 };
  const [isMinWidth, setIsMinWidth] = useState(false);
  const [isMaxWidth, setIsMaxWidth] = useState(false);

  const [color, setColor] = useState<string>(defaultLineConfig.lineColor);
  const [brush, setBrush] = useState<BrushType>(defaultLineConfig.brushType);
  const [width, setWidth] = useState<number>(defaultLineConfig.lineWidth);

  const [isErasing, setIsErasing] = useState<boolean>(false);

  const eraserHandler = () => {
    if (isErasing) {
      setLineColor(color);
      setLineWidth(width);
      setBrushType(brush);
      setIsErasing(false);
      return;
    }

    setBrushType("square");
    setLineColor("white");
    setLineWidth(40);
    setIsErasing(true);
  }

  const widthDecreaseHandler = () => {
    if (width <= widthBoudaries.min) {
      setIsMinWidth(true);
      return;
    }

    setIsMinWidth(false);
    setIsMaxWidth(false);
    setWidth(prevState => {
      setLineWidth(prevState - 5);
      return prevState - 5;
    });
  }

  const widthIncreaseHandler = () => {
    if (width >= widthBoudaries.max) {
      setIsMaxWidth(true);
      return;
    }

    setIsMaxWidth(false);
    setIsMinWidth(false);
    setWidth(prevState => {
      setLineWidth(prevState + 5);
      return prevState + 5;
    });
  }

  const colorChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsErasing(false);
    setLineWidth(width);
    setColor(event.target.value);
    setLineColor(event.target.value);
  }

  return (
    <div>
      <Button variant="default" onClick={eraserHandler}>Eraser</Button>
      <Button variant="default" onClick={widthDecreaseHandler} disabled={isMinWidth}>-</Button>
      <Button variant="default" onClick={widthIncreaseHandler} disabled={isMaxWidth}>+</Button>
      <input type="color" value={color} onChange={(e) => colorChangeHandler(e)} />
    </div>
  )
}

export default Toolbar;

