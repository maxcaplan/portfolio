import { FunctionComponent } from "react";
import { Work } from "../../../types";
import SkillIcon from "./SkillIcon";

import { Converter } from "showdown";

interface WorkCardProps extends Work {
  flipped?: boolean;
}

const WorkCard: FunctionComponent<WorkCardProps> = (props) => {
  const image_flip_classes = props.flipped
    ? "col-start-2 col-end-4"
    : "col-span-2";

  /** Adds a leading zero to posotive input number if it has less than 2 digits */
  const leading_zero = (num: number): string => {
    return `${Math.abs(num) < 10 ? "0" : ""}${Math.abs(num)}`;
  };

  const markdown_to_txt = (markdown: string): string => {
    const converter = new Converter();
    const html_str = `<div>${converter.makeHtml(markdown)}</div>`;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html_str, "text/xml");

    const walker = document.createTreeWalker(doc, NodeFilter.SHOW_TEXT);

    const text: string[] = [];
    let current_node: Node | null = walker.currentNode;

    while (current_node) {
      if (current_node && current_node.textContent)
        text.push(current_node.textContent);

      current_node = walker.nextNode();
    }

    return text.join(" ");
  };

  return (
    <div
      className={`
	group/card
	flex 
	flex-col 
	md:grid 
	grid-cols-3 
	grid-rows-7 
	grid-flow-row 
	gap-x-6 
	gap-y-4 
	w-full
	`}
    >
      <div
        className={`
		${image_flip_classes} 
		row-span-7 
		relative 
		mb-2 
		md:mb-0 
		bg-brand-gray-800 
		rounded
		`}
      >
        <div
          className={`
		-z-10 
		absolute 
		-bottom-2
		-left-2
		xl:-bottom-4 
		xl:-left-4 
		xl:group-hover/card:-translate-x-2
		xl:group-hover/card:translate-y-2
		w-full 
		h-full 
		border 
		border-brand-gray-400 
		rounded
		transition
		duration-200
		`}
        ></div>

        <div className="aspect-[16/9] xl:aspect-auto w-full h-full overflow-hidden rounded">
          <img
            src={props.image}
            alt="work image"
            className="w-full h-full object-cover group-hover/card:scale-105 transition duration-200"
          />
        </div>
      </div>

      <h3 className="col-span-1 row-span-1 text-2xl font-bold">
        {props.title}
      </h3>

      <h4 className="col-span-1 row-span-1 text-xl text-brand-gray-300">
        {leading_zero(props.date.month)}/{props.date.year}
      </h4>

      <div className="col-span-1 row-span-2">
        <p className="max-h-full font-sans line-clamp-3">
          {markdown_to_txt(props.description)}
        </p>
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
