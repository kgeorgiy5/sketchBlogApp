import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { FaRegSave } from "react-icons/fa";

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
  const canvasResolution = { x: 3000, y: 3000 };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [canvasSizeCoefs, setCanvasSizeCoefs] = useState({ x: 1, y: 1 });

  const [lineColor, setLineColor] = useState<string>(defaultLineConfig.lineColor);
  const [lineWidth, setLineWidth] = useState<number>(defaultLineConfig.lineWidth);
  const [brushType, setBrushType] = useState<BrushType>(defaultLineConfig.brushType);

  const [isDrawing, setIsDrawing] = useState(false);
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
      context.save();
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

  const stopDrawingHandler = () => {
    const context = canvasRef.current?.getContext("2d");

    if (!context) {
      return;
    }

    saveHandler();
    setIsDrawing(false);
  }

  const saveHandler = () => {
    if (canvasRef.current) {
      onSave(canvasRef.current.toDataURL());
      setIsSaved(true);
      return;
    }
  }

  const clearHandler = () => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) {
      return;
    }

    context.fillStyle = "#E2F1E7";
    context.fillRect(0, 0, canvasResolution.x, canvasResolution.y);
  }

  return (
    <div className={styles["main"]}>
      <canvas ref={canvasRef} className={styles["canvas"]}
        height={canvasResolution.x} width={canvasResolution.y}
        onMouseUp={stopDrawingHandler}
        onMouseOut={stopDrawingHandler}
        onMouseDown={(e) => mouseDownHandler(e)}
        onMouseMove={(e) => mouseMoveHandler(e)} />
      <div className={styles["tools"]}>
        <Button variant={isSaved ? "toolbar--success" : "toolbar"} disabled={true} onClick={saveHandler}><FaRegSave size="1rem" /></Button>
        <Toolbar
          onClear={clearHandler}
          defaultLineConfig={defaultLineConfig}
          setBrushType={setBrushType}
          setLineWidth={setLineWidth}
          setLineColor={setLineColor} />
      </div>
    </div>
  )
};

export default SketchCanvas;
