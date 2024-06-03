import Section from "../Section";
import { default as Content } from "../../../../content/Projects";
import ProjectCard from "./ProjectCard";

interface ProjectProps {
	sectionNumber: number
}

export default function Projects(props: ProjectProps) {
	return (
		<div>
			<Section
				title="projects"
				number={props.sectionNumber}
				titleClassName="!decoration-brand-green"
				backgroundWrapperClassName="flex justify-end p-4"
				className="mb-28"
			>
				<div className="relative z-50 flex flex-col w-full gap-28">
					{Content.map((project, idx) => {
						return (
							<ProjectCard key={project.title} project={project} flipped={idx % 2 == 1} />
						);
					})

					}
				</div>
			</Section>
		</div>
	)
}
