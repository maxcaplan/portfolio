import { FunctionComponent } from "react";
import SkillIcon, { Skill } from "./SkillIcon";

interface WorkCardProps {
  title: string;
  description: string;
  date: string;
  image: string;
  skills?: Skill[];
  flipped?: boolean;
}

const WorkCard: FunctionComponent<WorkCardProps> = (props) => {
  const image_flip_classes = props.flipped
    ? "col-start-2 col-end-4"
    : "col-span-2";
  return (
    <div className="flex flex-col md:grid grid-cols-3 grid-rows-7 grid-flow-row gap-x-6 gap-y-4 w-full">
      <div
        className={`${image_flip_classes} row-span-7 relative mb-2 md:mb-0 bg-brand-gray-800 rounded`}
      >
        <div
          className={`
		-z-10 
		absolute 
		-bottom-2
		-left-2
		xl:-bottom-4 
		xl:-left-4 
		w-full 
		h-full 
		border 
		border-brand-gray-400 
		rounded`}
        ></div>

        <div className="aspect-[16/9] xl:aspect-auto w-full h-full overflow-hidden rounded">
          <img
            src={props.image}
            alt="work image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <h3 className="col-span-1 row-span-1 text-2xl font-bold">
        {props.title}
      </h3>

      <h4 className="col-span-1 row-span-1 text-xl text-brand-gray-300">
        {props.date}
      </h4>

      <div className="col-span-1 row-span-2">
        <p className="max-h-full font-sans line-clamp-3">{props.description}</p>
      </div>

      <div className="col-span-1 row-span-1 flex flex-row gap-2">
        {props.skills &&
          props.skills.map((skill) => {
            return <SkillIcon skill={skill} />;
          })}
      </div>

      <div className="col-span-1 row-span-2 flex items-end">
        <button
          className={`
		px-4 
		py-1 
		rounded 
		border-brand-gray-200 
		bg-brand-gray-800 
		border 
		hover:bg-brand-gray-700
	    disabled:hidden
		`}
          disabled={true}
        >
          see more &gt;
        </button>
      </div>
    </div>
  );
};

WorkCard.defaultProps = {
  flipped: false,
};

export default WorkCard;
