import About from "./About";
import Projects from "./Projects";
import Work from "./Work";

interface SectionsProps {
	className?: string;
}

/** Home page main sections component (Contact section seperate) */
export default function Sections(props: SectionsProps) {
	return (
		<div className={props.className}>
			<Work sectionNumber={1} />
			<Projects sectionNumber={2} />
			<About sectionNumber={3} />
		</div>
	);
}
