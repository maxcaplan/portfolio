import { useState, useEffect, forwardRef } from "react"

import "./CharacterPixel.css"

type ASCIIPixelProps = {
    characters: String[],
    brightness: number,
    hidden?: Boolean
}

/**
 * Component that maps a brightness value to an array of text characters
 * @param {String[]} characters - Array of characters
 * @param {number} brightness - A brightness value from 0 to 1
 * @param {Boolean} [hidden] - Is the component hidden
 */
const CharacterPixel = forwardRef((props: ASCIIPixelProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const [characterIndex, setCharacterIndex] = useState(0);

    // Updates character index based on brightness 
    function updateCharacterIndex() {
        // Clamp brightness to range of 0,1
        const clampedBrightness = Math.min(Math.max(props.brightness, 0), 1);

        const i = Math.round((props.characters.length - 1) * clampedBrightness)
        setCharacterIndex(i)
    }

    // Update character index on brightness change
    useEffect(updateCharacterIndex, [props.brightness])

    return (
        <p ref={ref} className={props.hidden ? "character-pixel hidden" : "character-pixel"} >
            {props.characters[characterIndex]}
        </p >
    );
})

export default CharacterPixel;