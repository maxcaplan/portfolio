import { RefObject, useEffect, useRef, useState } from "react";

import WorkText from "./WorkText";

interface BackgroundTextProps {
  className?: string;
}

/** Work section background component */
export default function Background(props: BackgroundTextProps) {
  const [is_visible, set_is_visible] = useState(false);
  const [animated, set_animated] = useState(false);
  const [word_steps, set_word_steps] = useState(0);

  const container_ref = useRef<HTMLDivElement>(null);
  const svg_ref = useRef<SVGSVGElement>(null);
  const trigger_ref = useRef<HTMLDivElement>(null);

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

  const repeat_svg = (
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

    for (let i = 0; i < steps + 1; i++) {
      svgs.push(
        <WorkText
          key={`work-${i}`}
          first={i >= steps}
          animated={animated}
          className={`
		  absolute 
		  w-full 
		  h-fit 
		  ${i < steps ? "opacity-0" : ""}
		  `}
          style={{
            bottom: `${step_size * i}px`,
            animationDelay: `${(steps - i) / steps}s`,
          }}
        />,
      );
    }

    return svgs;
  };

  const handle_resize = () => {
    const steps = calc_trans_steps(container_ref, svg_ref);
    set_word_steps(steps);
  };

  const handle_scroll = () => {
    if (!animated && is_visible) set_animated(true);
  };

  // On component did update
  useEffect(() => {
    handle_resize();
    // Attach resize event
    window.onresize = handle_resize;

    // Clean up function
    return () => {
      window.onresize = null;
    };
  }, []);

  // Component did mount
  useEffect(() => {
    if (!trigger_ref.current) {
      set_is_visible(true);
      return;
    }

    // Set section is visible
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        set_is_visible(true);
        if (trigger_ref.current) observer.unobserve(trigger_ref.current);
      }
    });

    observer.observe(trigger_ref.current);

    window.onscroll = handle_scroll;

    return () => {
      window.onscroll = null;
      if (trigger_ref.current) observer.unobserve(trigger_ref.current);
    };
  });

  return (
    <div
      ref={container_ref}
      className={`relative flex flex-col-reverse h-full ${
        props.className || ""
      }`}
    >
      <div ref={trigger_ref} className="absolute top-1/2 right-0"></div>
      <WorkText
        ref={svg_ref}
        className="invisible absolute bottom-0 left-0 w-full h-fit"
      />
      {repeat_svg(word_steps, container_ref, svg_ref)}
    </div>
  );
}
