import { useState, useEffect, useRef } from "react";

import "./ContourNoise.css"

type ContourNoiseProps = {}

function ContourNoise(props: ContourNoiseProps) {
    // Refrence to canvas element
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Canvas size state to set canvas element size properties
    const [canvasWidth, setCanvasWidth] = useState(300);
    const [canvasHeight, setCanvasHeight] = useState(150);

    // Sets canvas size state to size of canvas element
    function updateCanvasSize() {
        if (canvasRef.current) {
            setCanvasWidth(canvasRef.current.clientWidth)
            setCanvasHeight(canvasRef.current.clientHeight)
        }
    }

    // On component mount
    useEffect(() => {
        updateCanvasSize()
        window.addEventListener("resize", updateCanvasSize)

        // Clean up
        return () => window.removeEventListener("resize", updateCanvasSize)
    }, [])

    return (
        <div id="contour-noise-wrapper">
            <canvas ref={canvasRef} id="contour-noise-canvas" width={canvasWidth} height={canvasHeight}></canvas>
        </div>
    );
}

export default ContourNoise;