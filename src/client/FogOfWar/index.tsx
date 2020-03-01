import React, { useRef, useEffect } from 'react';

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
        return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
  });

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={e => {
        if (!canvasRef.current) {
          return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return;
        };

        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }}
    />
  );
};
