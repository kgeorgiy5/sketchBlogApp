import { FC, MouseEvent, useEffect, useRef, useState } from "react";

// interface ISketchCanvasProps {
//   draw: (context: CanvasRenderingContext2D) => void;
// }

type point = { x: number, y: number };

const SketchCanvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);

  const getRelativeMouseCoordinates: (mouseEvent: MouseEvent<HTMLCanvasElement>) => point = (mouseEvent) => {
    const boundingRect = canvasRef.current?.getBoundingClientRect();
    if (boundingRect) {
      return {
        x: mouseEvent.clientX - boundingRect?.left,
        y: mouseEvent.clientY - boundingRect?.top
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
      context.lineTo(point.y, point.y);
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
      <canvas ref={canvasRef} height="500px" width="500px" onMouseUp={() => setIsDrawing(false)} onMouseOut={() => setIsDrawing(false)} onMouseDown={(e) => mouseDownHandler(e)} onMouseMove={(e) => mouseMoveHandler(e)} />
    </>
  )
};

export default SketchCanvas;
