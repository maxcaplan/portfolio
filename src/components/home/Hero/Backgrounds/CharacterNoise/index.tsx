import { useState, useEffect, useRef } from "react";

import CharacterPixel from "./CharacterPixel";

import { makeNoise3D } from "../../../../../utils/noise/perlin";

type CharacterNoiseProps = {
	animationSpeed?: number;
	frameRate?: number;
	seed?: number;
};

/**
 * Renders perlin noise with a grid of text characters
 * @param [animationSpeed=1] - The speed of the animation
 * @param [frameRate=12] - The fps of the animation
 * @param [seed=0] - Seeding for the noise generation
 */
export default function CharacterNoise({
	animationSpeed = 1,
	frameRate = 12,
	seed = 0,
}: CharacterNoiseProps) {
	// Refrence for container element
	const containerRef = useRef<HTMLDivElement>(null);
	// Refrence for character pixel element
	const pixelRef = useRef<HTMLParagraphElement>(null);

	// Grid of brightness values
	const [valueGrid, setValueGrid] = useState<number[][]>([]);

	const [noiseOffset, setNoiseOffset] = useState(0);

	// Init perlin noise with seed
	const noise = makeNoise3D(seed);

	/**
	 * Returns a noise value for a 3d point at a set scale
	 * @param {number} x - x position
	 * @param {number} y - y position
	 * @param {number} z - z position
	 * @param {number} [scale] - scale of noise
	 */
	function calcNoise(x: number, y: number, z: number, scale?: number) {
		return (
			(noise(x * (scale || 1), y * (scale || 1), z * (scale || 1)) + 1) / 2
		);
	}

	/**  Updates number of columns and rows in value grid */
	function updateGridSize() {
		// Get container dimensions
		let containerWidth = 0;
		let containerHeight = 0;
		if (containerRef.current) {
			containerWidth = containerRef.current.clientWidth;
			containerHeight = containerRef.current.clientHeight;
		}

		// Calculate number of rows and columns for grid
		let cols = 0;
		let rows = 0;
		if (pixelRef.current) {
			cols = Math.ceil(containerWidth / pixelRef.current.clientWidth);
			rows = Math.ceil(containerHeight / pixelRef.current.clientHeight);
		}

		const grid: number[][] = [];

		// Create grid of perlin noise values
		for (let y = 0; y < rows; y++) {
			const row: number[] = [];
			for (let x = 0; x < cols; x++) {
				row.push(calcNoise(x, y, noiseOffset * animationSpeed, 0.1));
			}
			grid.push(row);
		}

		setValueGrid(grid);
	}

	/** Updates the value of each cell in grid */
	function updateGrid() {
		if (valueGrid.length > 0 && valueGrid[0].length > 0) {
			const grid = [];
			for (let y = 0; y < valueGrid.length; y++) {
				const row = [];
				for (let x = 0; x < valueGrid[0].length; x++) {
					row.push(calcNoise(x, y, noiseOffset * animationSpeed, 0.1));
				}
				grid.push(row);
			}

			setValueGrid(grid);
		}
	}

	/**
	 * Animates perlin noise Z axis offset
	 * @param {number} timestamp - Timestamp of current frame
	 * @param {number} prevTimestamp - Timestamp of previous frame
	 * @param {number} count - The number of frames that have passed
	 */
	function animate(timestamp: number, prevTimestamp: number, count: number) {
		// Calculate time between current and previous frame
		const deltaTime = (timestamp - prevTimestamp) / 1000;
		// Update noise z offset
		const newCount = count + 1 * deltaTime;
		setNoiseOffset(newCount);
		// Request next frame
		setTimeout(() => {
			window.requestAnimationFrame((t) => animate(t, timestamp, newCount));
		}, 1000 / frameRate);
	}

	// Component did update
	useEffect(() => {
		// Update grid size and add resize event
		updateGridSize();
		window.addEventListener("resize", updateGridSize);

		// start updating noise Z offset at set intervels
		// let offsetIntervalID: number;
		// if (animated) {
		//     let count = 0
		//     offsetIntervalID = setInterval(draw(count), 100)
		// }

		window.requestAnimationFrame((t) => animate(t, t, 0));

		// Cleanup function
		return () => {
			// Clear offset interval funciton
			// if (animated) clearInterval(offsetIntervalID)
			// Remove resize listener
			window.removeEventListener("resize", updateGridSize);
		};
	}, []);

	// Update
	useEffect(updateGrid, [noiseOffset]);

	return (
		<div
			id="container"
			ref={containerRef}
			className="w-full h-full overflow-hidden"
		>
			<CharacterPixel
				ref={pixelRef}
				characters={["▓"]}
				brightness={1}
				hidden={true}
			/>

			<div id="grid" className="w-full h-full">
				{valueGrid.map((row, i) => (
					<div key={`row${i}`} className="grid-row w-max h-min">
						{row.map((val, j) => (
							<CharacterPixel
								key={`row${i}col${j}`}
								characters={["\u00A0", "\u00A0", "░", "▒", "▓", "▓"]}
								brightness={val}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
