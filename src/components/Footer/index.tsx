import { useState } from "react";

/** Page footer component */
export default function Footer() {
  let [emoticons, set_emoticons] = useState<string>(":) :( :/ :O")
  let [emoticon_timer, set_emoticon_timer] = useState<NodeJS.Timeout | undefined>()
  let [emoticon_is_mouse_over, set_emoticon_is_mouse_over] = useState(false)

  const random_emoticons = (emoticons: string[]) => {
    // Randomize the emoticon array using the Durstenfeld shuffle
    for (var i = emoticons.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = emoticons[i];
      emoticons[i] = emoticons[j];
      emoticons[j] = temp;
    }

    return emoticons.join(" ")
  }

  const on_mouse_enter_emoticons: React.MouseEventHandler = () => {
    set_emoticon_is_mouse_over(true)
    if (emoticon_timer === undefined) set_emoticons(random_emoticons(emoticons.split(" ")))

    set_emoticon_timer(setInterval(() => {
      set_emoticons(random_emoticons(emoticons.split(" ")))
    },
      500
    ))
  }

  const on_mouse_leave_emoticons: React.MouseEventHandler = () => {
    set_emoticon_is_mouse_over(false)
    if (emoticon_timer === undefined) return
    clearTimeout(emoticon_timer)
    set_emoticon_timer(undefined)
  }

  return (
    <div className="w-full border-t border-brand-gray-700 text-brand-gray-200 italic">
      <div className="relative sm:flex justify-center w-full max-w-6xl mx-auto py-4 px-6">
        <div className="hidden sm:flex items-center absolute top-0 bottom-0 left-0 w-fit px-6 border-r border-brand-gray-700" onMouseEnter={on_mouse_enter_emoticons} onMouseLeave={on_mouse_leave_emoticons}>
          <p className="text-sm not-italic">{emoticons}</p>
        </div>

        <p className="flex flex-row items-center">
          Copyleft
          {/* Copy left icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="mx-2 inline fill-current -scale-100"
          >
            <path d="M12 22c5.421 0 10-4.579 10-10S17.421 2 12 2 2 6.579 2 12s4.579 10 10 10zm0-18c4.337 0 8 3.663 8 8s-3.663 8-8 8-8-3.663-8-8 3.663-8 8-8z"></path>
            <path d="M12 17c.901 0 2.581-.168 3.707-1.292l-1.414-1.416C13.85 14.735 12.992 15 12 15c-1.626 0-3-1.374-3-3s1.374-3 3-3c.993 0 1.851.265 2.293.707l1.414-1.414C14.582 7.168 12.901 7 12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5z"></path>
          </svg>
          2022 - {new Date().getUTCFullYear()}
        </p>

        <div className="absolute top-0 bottom-0 right-0 w-fit px-6 flex items-center border-l border-brand-gray-700">
          <button
            title="Back to top"
            className="flex justify-center items-center aspect-square p-2 rounded border border-brand-gray-700 hover:bg-brand-gray-800"
            onClick={() => window.scrollTo(0, 0)}
          >
            {/* Arrow up icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-current"
            >
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
