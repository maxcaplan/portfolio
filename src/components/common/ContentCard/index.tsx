import { FunctionComponent, MouseEventHandler, useEffect, useRef, useState } from "react";

import { addLeadingZeros } from "../../../utils/numberFormatting";

import { Skill } from "../../../types";
import SkillIcon from "../../common/SkillIcon";
import { Link } from "react-router-dom";

interface ContentCardProps {
  contentId: string;
  title: string;
  date: { month: number, year: number };
  description: string;
  coverRoot: string;
  link: string;
  skills?: Skill[];
  flipped?: boolean;
}

/** Card component for displaying content */
const ContentCard: FunctionComponent<ContentCardProps> = (props) => {
  const image_wrapper_ref = useRef<HTMLAnchorElement>(null);
  const invert_circle_ref = useRef<HTMLDivElement>(null);

  const [is_image_hovered, set_is_image_hovered] = useState(false)
  const [is_circle_hidden, set_is_circle_hidden] = useState(true)
  const [mouse_has_moved, set_mouse_has_moved] = useState(false)
  const [circle_x, set_circle_x] = useState(-1000)
  const [circle_y, set_circle_y] = useState(-1000)
  const [target_x, set_target_x] = useState(-1000)
  const [target_y, set_target_y] = useState(-1000)
  const [tick, set_tick] = useState(0)

  const handle_mouse_move = (event: MouseEvent) => {
    if (!mouse_has_moved) set_mouse_has_moved(true)

    if (image_wrapper_ref.current === null) return
    if (invert_circle_ref.current === null) return

    const wrapper_rect = image_wrapper_ref.current.getBoundingClientRect()
    const circle_rect = invert_circle_ref.current.getBoundingClientRect()

    let x = event.clientX - wrapper_rect.left - circle_rect.width / 2
    let y = event.clientY - wrapper_rect.top - circle_rect.height / 2

    set_target_x(x)
    set_target_y(y)
  }

  const lerp = (x: number, y: number, a: number): number => x * (1 - a) + y * a;

  const set_circle_transform = () => {
    if (invert_circle_ref.current === null) return

    let new_x = lerp(circle_x, target_x, 0.1)
    let new_y = lerp(circle_y, target_y, 0.1)

    invert_circle_ref.current.style.transform = `translate(${new_x}px, ${new_y}px)`

    set_circle_x(new_x)
    set_circle_y(new_y)
  }

  const update_is_circle_hidden = () => {
    set_is_circle_hidden(image_wrapper_ref.current === null || invert_circle_ref === null)
  }

  const image_flip_classes = props.flipped
    ? "col-start-2 col-end-4"
    : "col-span-2";

  useEffect(() => {
    set_circle_transform()
  }, [tick])

  useEffect(() => {
    update_is_circle_hidden()
  }, [image_wrapper_ref, invert_circle_ref])

  // Component did mount
  useEffect(() => {
    update_is_circle_hidden()
    window.addEventListener("mousemove", handle_mouse_move)

    const anim = () => {
      set_tick((t) => t += 1)
      window.requestAnimationFrame(anim)
    }

    window.requestAnimationFrame(anim)
    set_circle_transform()

    return () => {
      window.removeEventListener("mousemove", handle_mouse_move)
    }
  }, [])

  return (
    <div itemScope itemType="https://schema.org/Article" className="flex flex-col md:grid grid-cols-3 grid-rows-7 grid-flow-row gap-x-6 gap-y-4 w-full">
      <div
        className={`${image_flip_classes} group/card row-span-7 relative mb-2 md:mb-0 bg-brand-gray-800 rounded`}
        onMouseEnter={() => set_is_image_hovered(true)}
        onMouseLeave={() => set_is_image_hovered(false)}
      >
        <div className="-z-10 absolute xl:-bottom-4 xl:-left-4 xl:group-hover/card:-translate-x-2 xl:group-hover/card:translate-y-2 w-full h-full border border-brand-gray-400 bg-brand-gray-950 rounded transition duration-200"></div>

        <Link
          ref={image_wrapper_ref}
          to={props.link}
          className="relative block aspect-[16/9] xl:aspect-auto w-full h-full overflow-hidden border border-brand-gray-400 rounded"
        >
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={`${props.coverRoot}cover_md.webp`}
              type="image/webp"
            />
            <source
              srcSet={`${props.coverRoot}cover_sm.webp`}
              type="image/webp"
            />

            <source
              media="(min-width: 768px)"
              srcSet={`${props.coverRoot}cover_md.png`}
              type="image/png"
            />
            <source
              srcSet={`${props.coverRoot}cover_sm.png`}
              type="image/png"
            />

            <img
              itemProp="thumbnail"
              src={`${props.coverRoot}cover_sm.png`}
              width="580"
              height="337"
              alt={`${props.title}`}
              className="w-full h-full object-cover group-hover/card:scale-105 transition duration-200"
            />
          </picture>

          <div
            ref={invert_circle_ref}
            className={`absolute aspect-square bg-white rounded-full mix-blend-difference top-0 left-0 ${is_circle_hidden || !mouse_has_moved ? "hidden" : ""}`}
            style={{
              height: is_image_hovered ? "12em" : "10em",
              transition: "height cubic-bezier(0.4, 0, 0.2, 1) 0.2s"
            }}
          ></div>
        </Link>
      </div>

      <h3 className="col-span-1 row-span-1 text-2xl font-bold">
        <Link itemProp="url" to={props.link}><span itemProp="name">{props.title}</span></Link>
      </h3>

      <h4 className="col-span-1 row-span-1 text-xl text-brand-gray-300">
        {addLeadingZeros(props.date.month)}/{props.date.year}
      </h4>

      <div className="col-span-1 row-span-2">
        <p itemProp="description" className="max-h-full font-sans line-clamp-3">
          {props.description}
        </p>
      </div>

      <div className="col-span-1 row-span-1 flex flex-row gap-2">
        {props.skills &&
          props.skills.map((skill, idx) => {
            return <SkillIcon key={`skill-${idx}`} skill={skill} />;
          })}
      </div>

      <div className="col-span-1 row-span-2 flex items-end">
        <Link
          to={props.link}
          className="px-4 py-1 rounded border-brand-gray-200 bg-brand-gray-800 border hover:bg-brand-gray-700"
        >
          see more &gt;
        </Link>
      </div>
    </div>
  );
};

ContentCard.defaultProps = {
  flipped: false,
};

export default ContentCard;
