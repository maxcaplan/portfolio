import CImg from "../../../assets/sections/contacts/chars/c.svg";
import OImg from "../../../assets/sections/contacts/chars/o.svg";
import NImg from "../../../assets/sections/contacts/chars/n.svg";
import TImg from "../../../assets/sections/contacts/chars/t.svg";
import AImg from "../../../assets/sections/contacts/chars/a.svg";

import { useEffect, useState } from "react";

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
      {[CImg, OImg, NImg, TImg, AImg, CImg, TImg].map((char, idx, chars) => {
        const grow = grow_arr[idx] ? "flex-grow" : "";
        const align = idx >= chars.length - 1 ? "justify-end" : "";

        return (
          <div
            className={`h-full flex items-end transition-[flex-grow] duration-1000 ${grow} ${align}`}
          >
            <img src={char} className="w-12" />
          </div>
        );
      })}
    </div>
  );
}
