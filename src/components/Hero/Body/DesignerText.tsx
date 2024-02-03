import { useEffect, useState } from "react";

interface DesignerTextProps {
	animationPaused?: boolean;
}

export default function DesignerText(props: DesignerTextProps) {
	const [animation_started, set_animation_started] = useState(false);
	const [designer_text_font, set_designer_text_font] = useState("font-mono");
	const [designer_cursor_active, set_designer_cursor_active] = useState(false);
	const [designer_text_highlited, set_designer_text_highlited] =
		useState(false);

	/** Animates the body designer text */
	const animate_designer_text = () => {
		set_designer_cursor_active(true);
		setTimeout(() => set_designer_text_highlited(true), 750);
		setTimeout(() => {
			let idx = 0;
			const interval = setInterval(() => {
				if (props.animationPaused) return;

				if (idx >= 5) {
					clearInterval(interval);
					set_designer_text_font(get_designer_text_font(-1));
					setTimeout(() => {
						set_designer_cursor_active(false);
						set_designer_text_highlited(false);
					}, 500);
					return;
				}

				set_designer_text_font(get_designer_text_font(idx));

				idx++;
			}, 200);
		}, 1000);
	};

	/** Returns a font for the body designer text given an index */
	const get_designer_text_font = (idx: number) => {
		const fonts: string[] = [
			"font-['Comic_Neue']",
			"font-['Lobster']",
			"font-['Merriweather']",
			"font-['VT323']",
			"font-['Indie_Flower']",
		];

		if (idx < 0) return "font-mono";
		else return fonts[idx % fonts.length];
	};

	// Set animation started state when first unpaused
	useEffect(() => {
		if (!props.animationPaused) {
			set_animation_started(true);
		}
	}, [props.animationPaused]);

	// Start animation when animation started state changes
	useEffect(() => {
		if (animation_started) {
			animate_designer_text();
		}
	}, [animation_started]);

	// On component did mount
	useEffect(() => {
		if (!props.animationPaused) {
			set_animation_started(true);
		}
	}, []);

	return (
		<h2
			className={`
		relative
		text-5xl 
		leading-normal 
		sm:text-7xl 
		sm:leading-normal 
		font-extrabold
		${designer_text_font}
		`}
		>
			<span
				className={`${designer_text_highlited
						? "bg-brand-gray-400 text-brand-white-100"
						: ""
					}`}
			>
				<span
					className={`
						${designer_cursor_active && !designer_text_highlited
							? "bg-brand-white-200 text-brand-gray-800"
							: ""
						}
						`}
				>
					D
				</span>
				ESIGNE
				<span
					className={`
						${designer_cursor_active && designer_text_highlited
							? "bg-brand-white-200 text-brand-gray-800"
							: ""
						}
						`}
				>
					R
				</span>
			</span>
		</h2>
	);
}
