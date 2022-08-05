import React, { useState, useEffect, useRef } from "react";

import "./CharacterNoise.css"

import CharacterPixel from "./CharacterPixel"

type ASCIINoiseProps = {}

/** Renders perlin noise with a grid of text characters */
function ASCIINoise(props: ASCIINoiseProps) {
    // Refrence for container element
    const containerRef = useRef<HTMLDivElement>(null)
    // Refrence for character pixel element
    const pixelRef = useRef<HTMLParagraphElement>(null)

    // Grid of brightness values
    const [valueGrid, setValueGrid] = useState([[]])

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

        // Create grid of 0's
        let row = new Array(cols).fill(1)
        let grid = new Array(rows).fill(row)

        setValueGrid(grid)
    }

    // Update grid size on component mount and add resize event
    useEffect(() => {
        updateGridSize()
        window.addEventListener("resize", updateGridSize)
    }, [])

    return (
        <div id="container" ref={containerRef}>
            <CharacterPixel ref={pixelRef} characters={["\u00A0", "░", "▒", "▓"]} brightness={1} hidden={true} />

            <div id="grid">
                {valueGrid.map((row, i) =>
                    <div key={`row${i}`} className="grid-row">
                        {row.map((val, j) =>
                            <CharacterPixel key={`row${i}col${j}`} characters={["\u00A0", "░", "▒", "▓"]} brightness={Math.random()} />
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}

export default ASCIINoise