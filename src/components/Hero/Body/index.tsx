import { useEffect, useState } from "react";

import DeveloperText from "./DeveloperText";
import DesignerText from "./DesignerText";

export default function HeroBody() {
	const [developer_anim_paused, set_developer_anim_paused] = useState(true);
	const [designer_anim_paused, set_designer_anim_paused] = useState(true);

	/** Returns the word 'good' with a character hover effect */
	const animated_good = () => {
		const characters = [
			{ char: "g", hover: "hover:text-brand-purple" },
			{ char: "o", hover: "hover:text-brand-green" },
			{ char: "o", hover: "hover:text-brand-red" },
			{ char: "d", hover: "hover:text-brand-blue" },
		];

		return characters.map(({ char, hover }, idx) => {
			return (
				<span
					key={idx}
					className={`
		  transition 
		  [&:not(:hover)]:duration-500 
		  cursor-pointer 
		  font-bold 
		  ${hover}`}
				>
					{char}
				</span>
			);
		});
	};

	// On component did mount
	useEffect(() => {
		const developer_anim_timeout = setTimeout(
			() => set_developer_anim_paused(false),
			1000,
		);

		return () => {
			clearTimeout(developer_anim_timeout);
		};
	}, []);

	return (
		<div id="hero-text" className="z-10 flex-grow flex items-center">
			<div className="flex flex-col">
				<h6 className="text-base md:text-xl italic text-brand-gray-300 leading-normal">
          // I like to make things
				</h6>

				<DeveloperText
					animationPaused={developer_anim_paused}
					onAnimationDone={() => set_designer_anim_paused(false)}
				/>

				<h6 className="text-base md:text-xl italic text-brand-gray-400 leading-normal">
          // And I like to make them {animated_good()}
				</h6>

				<DesignerText animationPaused={designer_anim_paused} />
			</div>
		</div>
	);
}
