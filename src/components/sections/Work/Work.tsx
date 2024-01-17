import BackgroundText from "./BackgroundText";
import WorkCard from "./WorkCard";

import Works from "../../../content/work";

export default function Work() {
  return (
    <div className="relative w-full py-6">
      <div
        id="work-background"
        className="z-0 absolute top-0 left-0 flex justify-end w-full h-full p-4"
      >
        <BackgroundText className="w-2/3 xl:w-1/2" />
      </div>

      <div
        id="work-content"
        className="z-50 relative w-full max-w-4xl mx-auto px-6"
      >
        <h2 className="text-3xl font-bold mb-12">
          1.{" "}
          <span className="decoration-brand-purple decoration-wavy decoration-2 underline">
            work
          </span>
        </h2>

        <div className="relative z-50 flex flex-col w-full gap-12">
          {Works.map((work, idx) => {
            return (
              <WorkCard
                title={work.title}
                date={work.date}
                description={work.description}
                skills={work.skills}
                image={work.image}
                flipped={idx % 2 == 1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
