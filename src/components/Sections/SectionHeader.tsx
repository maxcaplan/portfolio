interface SectionHeaderProps {
	number: number;
	title: string;
	className?: string;
}

export default function SectionHeader(props: SectionHeaderProps) {
	return (
		<h3
			className={`text-3xl font-bold decoration-brand-purple underline-offset-8 ${props.className || ""}`}
		>
			{props.number}
			{". "}
			<span
				className={`decoration-inherit decoration-wavy decoration-2 underline`}
			>
				{props.title}
			</span>
		</h3>
	);
}
