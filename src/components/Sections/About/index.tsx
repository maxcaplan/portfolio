import { useEffect, useRef, useState } from "react";
import Section from "../Section";
import BackgroundText from "./BackgroundText";
import TermPrompt from "./TermPrompt";

export default function About() {
  const [current_line, set_current_line] = useState(-1);
  const [active_line, set_active_line] = useState(0);

  const trigger_ref = useRef<HTMLDivElement>(null);

  /**
   * Returns the time between two dates in years
   * @param then - Start date
   * @param now - End date
   */
  const yearsBetween = (then: Date, now: Date): number => {
    let year_diff = now.getFullYear() - then.getFullYear();
    const month_diff = now.getMonth() - then.getMonth();
    const day_diff = now.getDate() - then.getDate();

    if (month_diff < 0) year_diff -= 1;
    if (month_diff == 0 && day_diff < 0) year_diff -= 1;

    return year_diff;
  };

  /**
   * Increments the current and active line state with delay
   * @param [wait_before] - Delay before starting TermPrompt animation
   * @param [wait_after] - Delay before next line
   */
  const increment_line = (
    wait_before: number = 2000,
    wait_after: number = 800,
  ) => {
    setTimeout(() => {
      set_active_line((prev) => {
        return prev + 1;
      });

      setTimeout(
        () =>
          set_current_line((prev) => {
            return prev + 1;
          }),
        wait_before,
      );
    }, wait_after);
  };

  /**
   * Sets the current and active line state to a number with delay
   * @param number - The number to set the active and current line to
   * @param [wait_before] - Delay before starting TermPrompt animation
   * @param [wait_after] - Delay before next line
   */
  const set_line = (
    number: number,
    wait_before: number = 2000,
    wait_after: number = 800,
  ) => {
    setTimeout(() => {
      set_active_line(number);

      setTimeout(() => set_current_line(number), wait_before);
    }, wait_after);
  };

  // On component did mount
  useEffect(() => {
    if (!trigger_ref.current) {
      set_line(0, 1000);
      return;
    }

    // Start animations when section is visible
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        set_line(0, 1000);
        if (trigger_ref.current) observer.unobserve(trigger_ref.current);
      }
    });

    observer.observe(trigger_ref.current);

    return () => {
      if (trigger_ref.current) observer.unobserve(trigger_ref.current);
    };
  }, []);

  return (
    <Section
      title="about"
      number={2}
      titleClassName="decoration-brand-green"
      backgroundChildren={<BackgroundText />}
    >
      <div ref={trigger_ref} className="relative flex flex-col gap-y-6 w-full">
        <TermPrompt
          directory="~"
          text="maxfetch"
          animated={true}
          paused={current_line < 0}
          active={active_line < 1}
          onDoneTyping={increment_line}
        />

        <div
          className={`
		flex 
		flex-col 
		md:grid 
		grid-flow-row 
		grid-cols-3 
		gap-6 
		w-full
		transition
		duration-500
		${active_line <= 0 ? "opacity-0 translate-y-4" : "opacity-100"}
		`}
        >
          <img
            src="https://picsum.photos/800/800"
            alt="Max Caplan"
            className="md:col-span-1 rounded shadow-xl shadow-brand-gray-950 w-full"
          />

          <div className="md:col-span-2 flex flex-col gap-y-6">
            <div className="w-full h-fit border border-brand-purple rounded p-6 leading-8">
              <p className="font-bold text-brand-purple">
                guest<span className="text-brand-white">@</span>maxcaplan.com
              </p>

              <p className="font-bold text-brand-white">---------</p>

              <p className="font-bold text-brand-white">
                <span className="text-brand-purple">Name</span>: Max Caplan
              </p>

              <p className="font-bold text-brand-white">
                <span className="text-brand-purple">UpTime</span>:{" "}
                {yearsBetween(new Date(2001, 5, 5), new Date())} years
              </p>

              <p className="font-bold text-brand-white">
                <span className="text-brand-purple">Location</span>:
                Canada/NovaScotia
              </p>

              <a
                href="https://en.wikipedia.org/wiki/Unix_shell"
                target="_blank"
                className="font-bold text-brand-white"
              >
                <span className="text-brand-purple">Shell</span>: English
              </a>
            </div>

            <div className="flex flex-row justify-center gap-x-8 w-full text-2xl">
              <p className="text-brand-blue">█▒</p>
              <p className="text-brand-green">█▒</p>
              <p className="text-brand-purple">█▒</p>
              <p className="text-brand-red">█▒</p>
            </div>
          </div>
        </div>

        <TermPrompt
          className={`${active_line < 1 ? "invisible" : ""}`}
          directory="~"
          text="cd about"
          animated={true}
          paused={current_line < 1}
          active={active_line == 1}
          onDoneTyping={() => increment_line(500, 800)}
        />

        <TermPrompt
          className={`${active_line < 2 ? "invisible" : ""}`}
          directory="~/about"
          text="cat bio.txt"
          animated={true}
          paused={current_line < 2}
          active={active_line == 2}
          onDoneTyping={increment_line}
        />

        <p
          className={`
		  transition
		  duration-500
		  ${active_line <= 2 ? "opacity-0 translate-y-4" : "opacity-100"}`}
        >
          Hi, I'm Max! I'm a full stack web developer and designer with over 3
          years of freelance experience and a lifetime of passion for building
          things!
        </p>

        <TermPrompt
          className={`${active_line < 3 ? "invisible" : ""}`}
          directory="~/about"
          active={active_line == 3}
        />
      </div>
    </Section>
  );
}
