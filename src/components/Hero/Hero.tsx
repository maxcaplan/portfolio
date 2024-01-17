import CharacterNoise from "../Backgrounds/CharacterNoise/CharacterNoise";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

type HeroProps = {
  className?: string;
};

const noise_seed = Date.now();

function Hero(props: HeroProps) {
  const good = () => {
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

  return (
    <div
      id="hero"
      className={`z-0 relative w-full h-screen max-h-full bg-brand-gray-800 ${
        props.className || ""
      }`}
    >
      <div
        id="hero-background"
        className="z-0 absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <CharacterNoise animationSpeed={5} seed={noise_seed} />
      </div>

      <div id="hero-container" className="z-10 flex flex-col w-full h-full p-6">
        <Navbar />
        <div id="hero-text" className="z-10 flex-grow flex items-center">
          <div className="flex flex-col">
            <h6 className="text-base md:text-xl italic text-brand-gray-300 leading-normal">
              // I like to make things
            </h6>

            <h1 className="text-5xl leading-normal sm:text-7xl sm:leading-normal font-extrabold">
              DEVELOPER
            </h1>

            <h6 className="text-base md:text-xl italic text-brand-gray-400 leading-normal">
              // And I like to make them {good()}
            </h6>

            <h1 className="text-5xl leading-normal sm:text-7xl sm:leading-normal font-extrabold">
              DESIGNER
            </h1>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Hero;
