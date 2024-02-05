import SectionHeader from "./SectionHeader";

interface SectionProps {
	number: number;
	title: string;
	titleClassName?: string;
	className?: string;
	children?: JSX.Element | JSX.Element[];
	backgroundChildren?: JSX.Element | JSX.Element[];
	backgroundWrapperClassName?: string;
}

/** Home page section wrapper component */
export default function Section(props: SectionProps) {
	return (
		<section
			className={`
	relative 
	w-full 
	${props.className}`}
			id={props.title}
		>
			{props.backgroundChildren != undefined && (
				<div
					className={`
		z-0 
		absolute 
		top-0 
		left-0 
		w-full 
		h-full 
		${props.backgroundWrapperClassName || ""}`}
				>
					{props.backgroundChildren}
				</div>
			)}

			<div className="z-50 relative w-full max-w-4xl mx-auto px-6">
				<SectionHeader
					title={props.title}
					number={props.number}
					className={`mb-20 ${props.titleClassName || ""}`}
				/>

				{props.children}
			</div>
		</section>
	);
}
