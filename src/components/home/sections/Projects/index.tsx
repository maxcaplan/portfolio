import Section from "../Section";
import { default as Content } from "../../../../content/Projects";
import ContentCard from "../../../common/ContentCard";
import Background from "./Background";


interface ProjectProps {
	sectionNumber: number
}

export default function Projects(props: ProjectProps) {
	const project_link = (id: string) => `/projects/${id.toLowerCase()}`;

	return (
		<div>
			<Section
				title="projects"
				number={props.sectionNumber}
				titleClassName="!decoration-brand-green"
				backgroundChildren={<Background />}
				backgroundWrapperClassName="overflow-hidden flex justify-center items-center"
				className="mb-28"
			>
				<div className="relative z-50 flex flex-col w-full gap-28">
					{Content.map((project, idx) => {
						return (
							<ContentCard
								key={project.title}
								contentId={project.id}
								title={project.title}
								date={project.date}
								description={project.description}
								skills={project.skills}
								coverRoot={project.coverImage}
								link={project_link(project.id)}
								flipped={idx % 2 == 1}
							/>
						);
					})

					}
				</div>
			</Section>

			<div className="w-full max-w-4xl mx-auto px-6 flex justify-center items-center gap-6">
				<div className="flex-grow border-b border-brand-gray-600" />

				<a
					href="https://github.com/maxcaplan"
					target="_blank"
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
						<title>Github</title>
						<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
						<path d="M9 18c-4.51 2-5-2-7-2" />
					</svg>
					<p className="text-xl font-bold leading-none">github</p>
				</a>

				<div className="flex-grow border-b border-brand-gray-600" />
			</div>
		</div>
	)
}
