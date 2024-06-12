import { FunctionComponent } from "react";

import { addLeadingZeros } from "../../../../../utils/numberFormatting";

import { Work } from "../../../../../types";
import SkillIcon from "../../../../common/SkillIcon";
import { Link } from "react-router-dom";
import ImageShader from "../../../../common/ImageShader";

interface WorkCardProps {
  work: Work;
  flipped?: boolean;
}

/** Work section work card component */
const WorkCard: FunctionComponent<WorkCardProps> = (props) => {
  const image_flip_classes = props.flipped
    ? "col-start-2 col-end-4"
    : "col-span-2";

  const work_link = (id: string) => `/work/${id.toLowerCase()}`;

  const frag_source = `
    precision mediump float;

    varying highp vec2 v_texcoord;

    uniform sampler2D u_texture;

    void main() {
      //vec4 tex_col = texture2D(u_texture, v_texcoord);
      //gl_FragColor = vec4(tex_col.x + 1., 1., 1., 1.);
      gl_FragColor = texture2D(u_texture, v_texcoord);
    }`

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
            fragSource={frag_source}
            alt={`${props.work.title}`}
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
