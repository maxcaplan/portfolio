import { useEffect, useState } from "react";

export default function useTypewriter(
  text: string,
  delay: number = 50,
  paused: boolean = false,
) {
  const [display_text, set_display_text] = useState("");
  const [idx, set_idx] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (paused) return;

      if (idx < text.length) {
        set_display_text((prev_text) => {
          return prev_text + text[idx];
        });

        set_idx((prev_idx) => {
          return prev_idx + 1;
        });
      } else {
        clearTimeout(timeout);
      }
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [idx, text, delay, paused]);

  return display_text;
}
