import { FC, MouseEvent, useEffect, useRef, useState } from "react";

import styles from "../../styles/sketch/SketchCanvas.module.css";
import Toolbar from "./Toolbar";
import Button from "../Button";

interface ISketchCanvasProps {
  onSave: (imageUrl: string) => void;
}

export interface ILineConfig {
  lineColor: string,
  lineWidth: number,
  brushType: BrushType
}

type Point = { x: number, y: number };
export type BrushType = "round" | "square";

const defaultLineConfig: ILineConfig = {
  lineColor: "black",
  lineWidth: 5,
  brushType: "round"
}

const SketchCanvas: FC<ISketchCanvasProps> = ({ onSave }) => {
  const canvasResolution = { x: 2000, y: 2000 };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSizeCoefs, setCanvasSizeCoefs] = useState({ x: 1, y: 1 });
  const [lineColor, setLineColor] = useState<string>(defaultLineConfig.lineColor);
  const [lineWidth, setLineWidth] = useState<number>(defaultLineConfig.lineWidth);
  const [brushType, setBrushType] = useState<BrushType>(defaultLineConfig.brushType);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const widthCoef = canvasResolution.x / canvasRef.current.offsetWidth;
    const heightCoef = canvasResolution.y / canvasRef.current.offsetHeight;

    const context = canvasRef.current.getContext("2d");

    if (!context) {
      return;
    }

    context.fillStyle = "#E2F1E7";
    context.fillRect(0, 0, canvasResolution.x, canvasResolution.y);

    setCanvasSizeCoefs({ x: widthCoef, y: heightCoef });
  }, [canvasResolution.x, canvasResolution.y])

  const [isDrawing, setIsDrawing] = useState(false);

  const getRelativeMouseCoordinates: (mouseEvent: MouseEvent<HTMLCanvasElement>) => Point = (mouseEvent) => {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current.getBoundingClientRect();

      return {
        x: (mouseEvent.clientX - boundingRect?.left) * canvasSizeCoefs.x,
        y: (mouseEvent.clientY - boundingRect?.top) * canvasSizeCoefs.y
      }
    }

    return { x: 0, y: 0 };
  }

  const mouseDownHandler = (mouseEvent: MouseEvent<HTMLCanvasElement>) => {
    const context = canvasRef.current?.getContext("2d");

    if (context) {
      setIsSaved(false);
      const point = getRelativeMouseCoordinates(mouseEvent);

      context.beginPath();
      context.moveTo(point.x, point.y);
      context.lineTo(point.x, point.y);
      context.lineCap = brushType;
      context.lineWidth = lineWidth;
      context.strokeStyle = lineColor;
      context.stroke();

      setIsDrawing(true);
    }

    mouseEvent.preventDefault();
  }

  const mouseMoveHandler = (mouseEvent: MouseEvent<HTMLCanvasElement>) => {
    const context = canvasRef.current?.getContext("2d");

    if (!isDrawing) {
      return;
    }

    if (context) {
      const point = getRelativeMouseCoordinates(mouseEvent);

      context.lineTo(point.x, point.y);
      context.stroke();
    }

    mouseEvent.preventDefault();
  }

  const saveHandler = () => {
    if (canvasRef.current) {
      onSave(canvasRef.current.toDataURL());
      setIsSaved(true);
      return;
    }
  }

  return (
    <>
      <p>{isSaved ? "Saved" : "Not saved"}</p>
      <canvas ref={canvasRef} className={styles["canvas"]}
        height={canvasResolution.x} width={canvasResolution.y}
        onMouseUp={() => setIsDrawing(false)}
        onMouseOut={() => setIsDrawing(false)}
        onMouseDown={(e) => mouseDownHandler(e)}
        onMouseMove={(e) => mouseMoveHandler(e)} />
      <Button variant="default" onClick={saveHandler}>Save</Button>
      <Toolbar
        defaultLineConfig={defaultLineConfig}
        setBrushType={setBrushType}
        setLineWidth={setLineWidth}
        setLineColor={setLineColor} />
    </>
  )
};

export default SketchCanvas;
