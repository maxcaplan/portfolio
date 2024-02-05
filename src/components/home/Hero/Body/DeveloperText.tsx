import { useEffect, useState } from "react";
import useTypewriter from "../../../../utils/hooks/useTypewriter";

interface DeveloperTextProps {
	animationPaused?: boolean;
	onAnimationDone?: () => void;
}

/** Hero body developer text component */
export default function DeveloperText(props: DeveloperTextProps) {
	const [cursor_visible, set_cursor_visible] = useState(true);

	const developer_target_text = "DEVELOPER";

	const developer_text = useTypewriter(
		developer_target_text,
		75,
		props.animationPaused,
	);

	// On developer_text changed
	useEffect(() => {
		if (developer_text == developer_target_text && cursor_visible) {
			setTimeout(() => {
				set_cursor_visible(false);
				if (props.onAnimationDone != undefined) {
					props.onAnimationDone();
				}
			}, 500);
		}
	}, [developer_text]);

	return (
		<h2
			className={`
					align-middle 
					text-5xl 
					leading-normal 
					sm:text-7xl 
					sm:leading-normal 
					font-extrabold
					`}
		>
			{developer_text}
			{cursor_visible && (
				<span className="text-4xl sm:text-6xl text-brand-white-200">█</span>
			)}
		</h2>
	);
}
