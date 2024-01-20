import { useEffect } from "react";
import useTypewriter from "../../../utils/hooks/useTypewriter";

interface TermPromptProps {
  directory: string;
  active?: boolean;
  text?: string;
  animated?: boolean;
  typewriter_speed?: number;
  paused?: boolean;
  onDoneTyping?: () => void;
  className?: string;
}

export default function TermPrompt(props: TermPromptProps) {
  let display_text = "";

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
