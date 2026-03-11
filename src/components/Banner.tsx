"use client"
import { useEffect, useRef } from "react";

type Props = { remainMondays: number };

export function Banner({ remainMondays }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.src = "/dem-nguoc-den-tet.jpg";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = "black";
      ctx.font = "italic 100px 'Patrick Hand', cursive";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const x = remainMondays < 10 ? canvas.width * 0.3 : canvas.width * 0.305;
      const y = canvas.height * 0.36;
      ctx.fillText(String(remainMondays), x, y);
    };
  }, [remainMondays]);

  return (
    <div className="flex justify-center py-4">
      <canvas
      ref={canvasRef}
      className="w-full max-w-[500px] h-auto"
    />
    </div>
  );
}