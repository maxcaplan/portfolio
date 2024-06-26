import { FunctionComponent } from "react";

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
  const image_flip_classes = props.flipped
    ? "col-start-2 col-end-4"
    : "col-span-2";

  return (
    <div itemScope itemType="https://schema.org/Article" className="flex flex-col md:grid grid-cols-3 grid-rows-7 grid-flow-row gap-x-6 gap-y-4 w-full">
      <div
        className={`${image_flip_classes} group/card row-span-7 relative mb-2 md:mb-0 bg-brand-gray-800 rounded`}
      >
        <div className="-z-10 absolute xl:-bottom-4 xl:-left-4 xl:group-hover/card:-translate-x-2 xl:group-hover/card:translate-y-2 w-full h-full border border-brand-gray-400 bg-brand-gray-950 rounded transition duration-200"></div>

        <Link
          to={props.link}
          className="block aspect-[16/9] xl:aspect-auto w-full h-full overflow-hidden border border-brand-gray-400 rounded"
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
