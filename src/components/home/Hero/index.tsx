import { ForwardedRef, forwardRef } from "react";

import Navbar from "./Navbar";
import CharacterNoise from "./Backgrounds/CharacterNoise";
import HeroBody from "./Body";
import Footer from "./Footer";

type HeroProps = {
	className?: string;
};

/** Home page hero section component */
const Hero = forwardRef(
	(props: HeroProps, ref: ForwardedRef<HTMLDivElement>) => {
		const noise_seed = Date.now();

		return (
			<div
				ref={ref}
				className={`z-0 relative w-full h-screen overflow-x-hidden max-h-full bg-brand-gray-800 ${props.className || ""}`}
			>
				<div className="z-0 absolute top-0 left-0 w-full h-full pointer-events-none">
					<CharacterNoise animationSpeed={5} seed={noise_seed} />
				</div>

				<div
					id="hero-container"
					className="z-10 flex flex-col w-full h-full p-6"
				>
					<Navbar />

					<HeroBody />

					<Footer />
				</div>
			</div>
		);
	},
);

export default Hero;
