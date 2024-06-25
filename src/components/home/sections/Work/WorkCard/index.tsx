import { FunctionComponent, useEffect, useRef, useState } from "react";

import { addLeadingZeros } from "../../../../../utils/numberFormatting";

import { Work } from "../../../../../types";
import SkillIcon from "../../../../common/SkillIcon";
import { Link } from "react-router-dom";
import ImageShader from "../../../../common/ImageShader";
// import { useUniform } from "../../../../../utils/hooks/useUniform";

interface WorkCardProps {
  work: Work;
  flipped?: boolean;
}

/** Work section work card component */
const WorkCard: FunctionComponent<WorkCardProps> = (props) => {
  const [mouse_x, set_mouse_x] = useState(0)
  const [mouse_y, set_mouse_y] = useState(0)

  const image_shader_ref = useRef<HTMLDivElement>(null)

  const image_flip_classes = props.flipped
    ? "col-start-2 col-end-4"
    : "col-span-2";

  const work_link = (id: string) => `/work/${id.toLowerCase()}`;

  const handle_mouse_move = (event: MouseEvent) => {
    if (image_shader_ref.current === null) {
      set_mouse_x(0)
      set_mouse_y(0)
      return
    }

    const image_rect = image_shader_ref.current.getBoundingClientRect()

    const x = event.clientX - image_rect.left
    const y = event.clientY - image_rect.top

    set_mouse_x(x)
    set_mouse_y(y)
  }

  const frag_source = `
    precision highp float;

    uniform vec2 u_resolution;
    uniform sampler2D u_texture;

    uniform vec2 u_mouseCoord;

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      vec2 muv = u_mouseCoord / u_resolution;
      muv.x = muv.x * -1.;
      // uv = uv + muv;

      vec4 tex_col = texture2D(u_texture, vec2(uv.x, 1. - uv.y));

      gl_FragColor = tex_col;
      // gl_FragColor = vec4(uv.xy, 1., 1.);
    }`

  // Component did mount
  useEffect(() => {
    window.addEventListener("mousemove", handle_mouse_move)

    return () => {
      window.removeEventListener("mousemove", handle_mouse_move)
    }
  }, [])

  return (
    <div itemScope itemType="https://schema.org/Article" className="flex flex-col md:grid grid-cols-3 grid-rows-7 grid-flow-row gap-x-6 gap-y-4 w-full">
      <div
        className={`${image_flip_classes} group/card row-span-7 relative mb-2 md:mb-0 bg-brand-gray-800 rounded`}
      >
        <div className="-z-10 absolute xl:-bottom-4 xl:-left-4 xl:group-hover/card:-translate-x-2 xl:group-hover/card:translate-y-2 w-full h-full border border-brand-gray-400 bg-brand-gray-950 rounded transition duration-200"></div>

        <Link
          to={work_link(props.work.id)}
          className="block aspect-[16/9] xl:aspect-auto w-full h-full overflow-hidden border border-brand-gray-400 rounded"
        >
          <ImageShader
            ref={image_shader_ref}
            src={`${props.work.coverImage}cover_sm.png`}
            srcSet={[
              {
                media: "(min-width: 768px)",
                srcSet: `${props.work.coverImage}cover_md.webp`,
                type: "image/webp"
              },
              {
                srcSet: `${props.work.coverImage}cover_sm.webp`,
                type: "image/webp"
              },
              {
                media: "(min-width: 768px)",
                srcSet: `${props.work.coverImage}cover_md.png`,
                type: "image/png"
              },
              {
                srcSet: `${props.work.coverImage}cover_sm.webp`,
                type: "image/png"
              },
            ]}
            alt={`${props.work.title}`}
            fragSource={frag_source}
            // customUniforms={{ name: "u_mouseCoord", x: mouse_x, y: mouse_y }}
            animate={true}
            frameRate={24}
            wrapperClassName="w-full h-full object-cover group-hover/card:scale-105 transition duration-200"
          />
        </Link>
      </div>

      <h3 className="col-span-1 row-span-1 text-2xl font-bold">
        <Link itemProp="url" to={work_link(props.work.id)}><span itemProp="name">{props.work.title}</span></Link>
      </h3>

      <h4 className="col-span-1 row-span-1 text-xl text-brand-gray-300">
        {addLeadingZeros(props.work.date.month)}/{props.work.date.year}
      </h4>

      <div className="col-span-1 row-span-2">
        <p itemProp="description" className="max-h-full font-sans line-clamp-3">
          {props.work.description}
        </p>
      </div>

      <div className="col-span-1 row-span-1 flex flex-row gap-2">
        {props.work.skills &&
          props.work.skills.map((skill, idx) => {
            return <SkillIcon key={`skill-${idx}`} skill={skill} />;
          })}
      </div>

      <div className="col-span-1 row-span-2 flex items-end">
        <Link
          to={work_link(props.work.id)}
          className="px-4 py-1 rounded border-brand-gray-200 bg-brand-gray-800 border hover:bg-brand-gray-700"
        >
          see more &gt;
        </Link>
      </div>
    </div>
  );
};

WorkCard.defaultProps = {
  flipped: false,
};

export default WorkCard;
