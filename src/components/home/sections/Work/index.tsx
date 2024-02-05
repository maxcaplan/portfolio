import Background from "./Background";
import WorkCard from "./WorkCard";

import Works from "../../../../content/Work";
import Section from "../Section";

/** Work section component */
export default function Work() {
	return (
		<Section
			title="work"
			number={1}
			titleClassName="!decoration-brand-blue"
			backgroundChildren={<Background className="w-2/3 xl:w-1/2" />}
			backgroundWrapperClassName="flex justify-end p-4"
		>
			<div className="relative z-50 flex flex-col w-full gap-28">
				{Works.map((work, idx) => {
					return (
						<WorkCard
							key={work.title}
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
		</Section>
	);
}
