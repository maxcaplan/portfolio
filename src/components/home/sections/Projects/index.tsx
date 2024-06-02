import Section from "../Section";

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
				</div>
			</Section>
		</div>
	)
}
