import { useEffect } from "react";
import useTypewriter from "../../../utils/hooks/useTypewriter";

interface TermPromptProps {
  /** A directory to show on the mock prompt */
  directory: string;
  /** Determins if a cursor is shown on the mock prompt */
  active?: boolean;
  /** Text to display as the input to the mock prompt */
  text?: string;
  /** Determins if the prompt text is displayed with a typing animation */
  animated?: boolean;
  /** The speed of the typing animation */
  typewriter_speed?: number;
  /** Determins if the typing animation is paused */
  paused?: boolean;
  /** A function to call when the typing animation is done */
  onDoneTyping?: () => void;
  /** className to append to the component */
  className?: string;
}

/**
 * Mock terminal prompt component
 * @param props - The component props
 */
export default function TermPrompt(props: TermPromptProps) {
  let display_text = "";

  /** Sets display text to useTypewriter hook if prompt is animated */
  const set_typewriter = () => {
    if (props.text != undefined && props.animated) {
      display_text = useTypewriter(
        props.text,
        props.typewriter_speed,
        props.paused,
      );
    }
  };

  set_typewriter();

  // Call onDoneTyping function prop when text is done being typed
  useEffect(() => {
    if (
      props.animated &&
      !props.paused &&
      display_text === props.text &&
      typeof props.onDoneTyping != "undefined"
    ) {
      props.onDoneTyping();
    }
  }, [display_text]);

  return (
    <p className={`text-brand-blue ${props.className || ""}`}>
      <span className="font-bold text-brand-green">guest</span>{" "}
      <span className="font-bold text-brand-blue">{props.directory}</span>{" "}
      <span className="font-bold text-brand-purple">❯</span>{" "}
      {props.animated && <span>{display_text}</span>}
      {!props.animated && <span>{props.text}</span>}
      {props.active && (
        <span className="text-brand-white-200 animate-blink">█</span>
      )}
    </p>
  );
}
