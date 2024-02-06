import Background from "./Background";
import WorkCard from "./WorkCard";

import Works from "../../../../content/Work";
import Section from "../Section";
import { Link } from "react-router-dom";

/** Work section component */
export default function Work() {
  return (
    <div>
      <Section
        title="work"
        number={1}
        titleClassName="!decoration-brand-blue"
        backgroundChildren={<Background className="w-2/3 xl:w-1/2" />}
        backgroundWrapperClassName="flex justify-end p-4"
        className="mb-28"
      >
        <div className="relative z-50 flex flex-col w-full gap-28">
          {Works.map((work, idx) => {
            return (
              <WorkCard key={work.title} work={work} flipped={idx % 2 == 1} />
            );
          })}
        </div>
      </Section>

      <div className="w-full max-w-4xl mx-auto px-6 flex justify-center items-center gap-6">
        <div className="flex-grow border-b border-brand-gray-600" />

        <Link
          to="/resume"
          className="flex flex-row items-center gap-2 px-4 py-3 rounded border border-brand-gray-300 bg-brand-gray-800 hover:bg-brand-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
          >
            <title>Resume</title>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <p className="text-xl font-bold leading-none">resume</p>
        </Link>

        <div className="flex-grow border-b border-brand-gray-600" />
      </div>
    </div>
  );
}
