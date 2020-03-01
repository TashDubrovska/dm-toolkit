import React, { useRef, useEffect, useState } from 'react'

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [
    canvasContext,
    setCanvasContext,
  ] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    const canvas: HTMLCanvasElement = canvasRef.current

    setCanvas(canvas)
    setCanvasContext(canvas.getContext('2d'))
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={e => {
        if (!canvasContext || !canvas) {
          return
        }

        canvasContext.fillStyle = 'blue'
        canvasContext.fillRect(0, 0, canvas.width, canvas.height)
      }}
    />
  )
}
