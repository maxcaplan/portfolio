import React, { useState, useEffect, useRef } from "react";

import "./CharacterNoise.css"

import CharacterPixel from "./CharacterPixel"

import { makeNoise3D } from "../../../utils/noise/perlin.js"

type ASCIINoiseProps = {}

/** Renders perlin noise with a grid of text characters */
function ASCIINoise(props: ASCIINoiseProps) {
    // Refrence for container element
    const containerRef = useRef<HTMLDivElement>(null)
    // Refrence for character pixel element
    const pixelRef = useRef<HTMLParagraphElement>(null)

    // Grid of brightness values
    const [valueGrid, setValueGrid] = useState<number[][]>([])

    const [noiseOffset, setNoiseOffset] = useState(0)

    // Init perlin noise with current time as seed
    const noise = makeNoise3D(new Date().getTime())

    /** Returns a noise value for a 3d point at a set scale
     * @param {number} x - x position
     * @param {number} y - y position
     * @param {number} z - z position
     * @param {number} [scale] - scale of noise
     */
    function calcNoise(x: number, y: number, z: number, scale?: number) {
        return (noise(x * (scale || 1), y * (scale || 1), z * (scale || 1)) + 1) / 2
    }

    /**  Updates number of columns and rows in value grid */
    function updateGridSize() {
        // Get container dimensions
        let containerWidth = 0
        let containerHeight = 0
        if (containerRef.current) {
            containerWidth = containerRef.current.clientWidth
            containerHeight = containerRef.current.clientHeight
        }

        // Calculate number of rows and columns for grid
        let cols = 0
        let rows = 0
        if (pixelRef.current) {
            cols = Math.ceil(containerWidth / pixelRef.current.clientWidth)
            rows = Math.ceil(containerHeight / pixelRef.current.clientHeight)
        }

        const grid: number[][] = []

        // Create grid of perlin noise values
        for (let y = 0; y < rows; y++) {
            const row: number[] = []
            for (let x = 0; x < cols; x++) {
                row.push(calcNoise(x, y, noiseOffset, 0.25))
            }
            grid.push(row)
        }

        setValueGrid(grid)
    }

    // Update grid size on component mount and add resize event
    useEffect(() => {
        updateGridSize()
        window.addEventListener("resize", updateGridSize)

        // Remove event listener on component unmount
        return () => window.removeEventListener("resize", updateGridSize)
    }, [])

    return (
        <div id="container" ref={containerRef}>
            <CharacterPixel ref={pixelRef} characters={["▓"]} brightness={1} hidden={true} />

            <div id="grid">
                {valueGrid.map((row, i) =>
                    <div key={`row${i}`} className="grid-row">
                        {row.map((val, j) =>
                            <CharacterPixel key={`row${i}col${j}`} characters={["\u00A0", "\u00A0", "░", "▒", "▓", "▓"]} brightness={val} />
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}

export default ASCIINoise