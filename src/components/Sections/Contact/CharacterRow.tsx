import { useEffect, useState } from "react";

import Chars from "./Chars";

export default function CharacterRow() {
  const [grow_arr, set_grow_arr] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    true,
  ]);

  const randomize_grow_arr = () => {
    const new_arr = [...grow_arr];
    for (let i = 0; i < grow_arr.length; i++) {
      new_arr[i] = Math.random() > 0.5;
      if (Math.random() >= new_arr.length - 1) new_arr[i] = false;
    }

    set_grow_arr(new_arr);
  };

  // On component did mount
  useEffect(() => {
    randomize_grow_arr();

    const interval = setInterval(() => {
      randomize_grow_arr();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full flex flex-row gap-x-2">
      {Chars.map((Char, idx) => {
        const grow = grow_arr[idx] ? "flex-grow" : "";
        const align = idx >= Chars.length - 1 ? "justify-end" : "";

        return (
          <div
            className={`h-full flex items-end transition-[flex-grow] duration-1000 ${grow} ${align}`}
          >
            <Char className="fill-brand-gray-900 stroke-brand-gray-700 stroke-2 w-12" />
          </div>
        );
      })}
    </div>
  );
}
