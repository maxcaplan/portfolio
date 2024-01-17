import BackgroundText from "./BackgroundText";
import { Skill } from "./SkillIcon";
import WorkCard from "./WorkCard";

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
          <WorkCard
            title="Test Work"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            date="01/2024"
            skills={[
              Skill.javascript,
              Skill.react,
              Skill.vue,
              Skill.node,
              Skill.firebase,
            ]}
            image={`https://picsum.photos/seed/${Math.round(
              Math.random() * 100,
            )}/1920/1080`}
            flipped={false}
          />
          <WorkCard
            title="Test Work 2"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            date="01/2024"
            skills={[
              Skill.javascript,
              Skill.react,
              Skill.vue,
              Skill.node,
              Skill.firebase,
            ]}
            image={`https://picsum.photos/seed/${Math.round(
              Math.random() * 100,
            )}/1920/1080`}
            flipped={true}
          />
          <WorkCard
            title="Test Work 3"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            date="01/2024"
            skills={[
              Skill.javascript,
              Skill.react,
              Skill.vue,
              Skill.node,
              Skill.firebase,
            ]}
            image={`https://picsum.photos/seed/${Math.round(
              Math.random() * 100,
            )}/1920/1080`}
            flipped={false}
          />
        </div>
      </div>
    </div>
  );
}
