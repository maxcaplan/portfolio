import { useState, useEffect, forwardRef } from "react";

type CharacterPixelProps = {
  characters: string[];
  brightness: number;
  hidden?: boolean;
  className?: string;
};

/**
 * Component that maps a brightness value to an array of text characters
 * @param {String[]} characters - Array of characters
 * @param {number} brightness - A brightness value from 0 to 1
 * @param {Boolean} [hidden] - Is the component hidden
 */
const CharacterPixel = forwardRef(
  (props: CharacterPixelProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const [characterIndex, setCharacterIndex] = useState(0);

    // Updates character index based on brightness
    function updateCharacterIndex() {
      // Clamp brightness to range of 0,1
      const clampedBrightness = Math.min(Math.max(props.brightness, 0), 1);

      const i = Math.round((props.characters.length - 1) * clampedBrightness);
      setCharacterIndex(i);
    }

    const hidden_classes = props.hidden ? "invisible absolute" : "";

    // Update character index on brightness change
    useEffect(updateCharacterIndex, [props.brightness]);

    return (
      <div className={`inline-block size-fit px-1 ${hidden_classes}`}>
        <span
          ref={ref}
          className={`
		  inline-block 
		  text-5xl 
		  leading-normal 
		  text-brand-gray-700 
		  font-bold
		  ${props.className}`}
        >
          {props.characters[characterIndex]}
        </span>
      </div>
    );
  },
);

export default CharacterPixel;
