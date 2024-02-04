import { ForwardedRef, forwardRef } from "react";
import CharacterNoise from "./Backgrounds/CharacterNoise";
import HeroBody from "./Body";
import Footer from "./Footer";
import Navbar from "./Navbar";

type HeroProps = {
	className?: string;
};

const noise_seed = Date.now();

const Hero = forwardRef(
	(props: HeroProps, ref: ForwardedRef<HTMLDivElement>) => {
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
