import { RefObject, useLayoutEffect, useRef, useState } from "react";

import WorkText from "./WorkText";

interface BackgroundTextProps {
  className?: string;
}

export default function BackgroundText(props: BackgroundTextProps) {
  const [word_steps, set_word_steps] = useState(0);

  const container_ref = useRef<HTMLDivElement>(null);
  const svg_ref = useRef<SVGSVGElement>(null);

  const calc_trans_steps = (
    container_ref: RefObject<HTMLDivElement>,
    svg_ref: RefObject<SVGSVGElement>,
  ): number => {
    if (svg_ref.current == null) return 0;
    if (container_ref.current == null) return 0;

    if (svg_ref.current.clientHeight == 0) return 0;
    if (container_ref.current.clientHeight == 0) return 0;

    const container_height = container_ref.current.clientHeight;
    const svg_height = svg_ref.current.clientHeight;

    const svg_step_size_mult = window.innerWidth > 896 ? 0.25 : 0.5;

    const steps = Math.floor(
      (container_height - svg_height) / (svg_height * svg_step_size_mult),
    );

    return steps;
  };

  const repeat_text = (
    steps: number,
    container_ref: RefObject<HTMLDivElement>,
    svg_ref: RefObject<SVGSVGElement>,
  ): JSX.Element[] | undefined => {
    if (svg_ref.current == null) return;
    if (container_ref.current == null) return;

    const container_height = container_ref.current.clientHeight;
    const svg_height = svg_ref.current.clientHeight;
    const step_size = (container_height - svg_height) / steps;

    const svgs: JSX.Element[] = [];

    for (let i = 0; i < steps; i++) {
      svgs.push(
        <WorkText
          key={i}
          className="absolute left-0 w-full h-fit"
          style={{
            bottom: `${step_size * (i + 1)}px`,
          }}
        />,
      );
    }

    return svgs;
  };

  const handle_resize = () => {
    const steps = calc_trans_steps(container_ref, svg_ref);
    console.log(steps);
    set_word_steps(steps);
  };

  // On component did update
  useLayoutEffect(() => {
    handle_resize();
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
      <WorkText
        ref={svg_ref}
        className="absolute bottom-0 left-0 w-full h-fit"
      />
      {repeat_text(word_steps, container_ref, svg_ref)}
    </div>
  );
}
