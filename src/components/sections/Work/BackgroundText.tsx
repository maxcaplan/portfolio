import { RefObject, useLayoutEffect, useRef, useState } from "react";
import WorkText from "../../../assets/sections/work/work_bg_text.svg";

interface BackgroundTextProps {
  className?: string;
}

export default function BackgroundText(props: BackgroundTextProps) {
  const [word_steps, set_word_steps] = useState(0);

  const container_ref = useRef<HTMLDivElement>(null);
  const text_ref = useRef<HTMLImageElement>(null);

  const calc_trans_steps = (
    container_ref: RefObject<HTMLDivElement>,
    text_ref: RefObject<HTMLImageElement>,
  ): number => {
    if (text_ref.current == null) return 0;
    if (container_ref.current == null) return 0;

    if (text_ref.current.clientHeight == 0) return 0;
    if (container_ref.current.clientHeight == 0) return 0;

    const container_height = container_ref.current?.clientHeight;
    const text_height = text_ref.current.clientHeight;

    const steps = Math.floor(
      (container_height - text_height) / (text_height * 0.25),
    );

    return steps;
  };

  const repeat_img = (
    src: string,
    steps: number,
    container_ref: RefObject<HTMLDivElement>,
    text_ref: RefObject<HTMLImageElement>,
  ): JSX.Element[] | undefined => {
    if (text_ref.current == null) return;
    if (container_ref.current == null) return;

    const container_height = container_ref.current.clientHeight;
    const text_height = text_ref.current.clientHeight;
    const step_size = (container_height - text_height) / steps;

    const imgs: JSX.Element[] = [];

    for (let i = 0; i < steps; i++) {
      imgs.push(
        <img
          id={`${i}`}
          key={i}
          src={src}
          className="absolute left-0 w-full"
          style={{
            bottom: `${step_size * (i + 1)}px`,
          }}
        />,
      );
    }

    return imgs;
  };

  const handle_resize = () => {
    const steps = calc_trans_steps(container_ref, text_ref);
    set_word_steps(steps);
  };

  // On component did update
  useLayoutEffect(() => {
    calc_trans_steps(container_ref, text_ref);
    // Attach resize event
    window.onresize = handle_resize;

    // Clean up function
    return () => {
      window.onresize = null;
    };
  }, []);

  return (
    <div
      ref={container_ref}
      className={`relative flex flex-col-reverse ${props.className || ""}`}
    >
      <img
        src={WorkText}
        ref={text_ref}
        onLoad={() => {
          handle_resize();
        }}
        className="absolute bottom-0 left-0 w-full"
      />
      {repeat_img(WorkText, word_steps, container_ref, text_ref)}
    </div>
  );
}
