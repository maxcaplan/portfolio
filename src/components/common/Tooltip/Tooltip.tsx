interface TooltipProps {
	tooltipText: string;
	className?: string;
}

export default function Tooltip(props: TooltipProps) {
	return (
		<span
			className={`
	  	absolute
	  	-top-[100%] 
	  	left-1/2 
	  	-translate-x-1/2
		${props.className || ""}
	  	`}
		>
			<span
				className={`
			px-3
	    	py-1
	    	rounded
	    	text-sm
			italic
	    	bg-brand-gray-600
	    	shadow-brand-gray-950
	    	shadow-md
			`}
			>
				{props.tooltipText}
			</span>
			<span className="flex justify-center w-full">
				<svg
					height="6.38248856"
					width="14"
					viewBox="0 0 320 145.88545"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					className="fill-brand-gray-600"
				>
					<path d="m 136.00529,135.93191 c 13.2714,13.2714 34.82415,13.2714 48.09555,0 L 319.99997,0.03279553 C 320.11405,-0.08130447 0,0.13895553 0,0.13895553 L 135.89912,136.03809 Z" />
				</svg>
			</span>
		</span>
	);
}
