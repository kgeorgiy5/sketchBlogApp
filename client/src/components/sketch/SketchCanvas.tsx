import { FC, MouseEvent, useEffect, useRef, useState } from "react";

import styles from "../../styles/sketch/SketchCanvas.module.css";
import Toolbar from "./Toolbar";

// interface ISketchCanvasProps {
//   draw: (context: CanvasRenderingContext2D) => void;
// }

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

const SketchCanvas: FC = () => {
  const canvasResolution = { x: 2000, y: 2000 };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSizeCoefs, setCanvasSizeCoefs] = useState({ x: 1, y: 1 });
  const [lineColor, setLineColor] = useState<string>(defaultLineConfig.lineColor);
  const [lineWidth, setLineWidth] = useState<number>(defaultLineConfig.lineWidth);
  const [brushType, setBrushType] = useState<BrushType>(defaultLineConfig.brushType);

  useEffect(() => {
    if (canvasRef.current) {
      const widthCoef = canvasResolution.x / canvasRef.current.offsetWidth;
      const heightCoef = canvasResolution.y / canvasRef.current.offsetHeight;

      setCanvasSizeCoefs({ x: widthCoef, y: heightCoef });
    }
  }, [])

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


  return (
    <>
      <canvas ref={canvasRef} className={styles["canvas"]}
        height={canvasResolution.x} width={canvasResolution.y}
        onMouseUp={() => setIsDrawing(false)}
        onMouseOut={() => setIsDrawing(false)}
        onMouseDown={(e) => mouseDownHandler(e)}
        onMouseMove={(e) => mouseMoveHandler(e)} />
      <Toolbar
        defaultLineConfig={defaultLineConfig}
        setBrushType={setBrushType}
        setLineWidth={setLineWidth}
        setLineColor={setLineColor} />
    </>
  )
};

export default SketchCanvas;
