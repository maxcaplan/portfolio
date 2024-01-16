import CharacterNoise from "../Backgrounds/CharacterNoise/CharacterNoise";
import CharacterPixel from "../Backgrounds/CharacterNoise/CharacterPixel";

type HeroProps = {};

const noise_seed = Date.now();

function Hero(props: HeroProps) {
  const comment_pref = [
    <span className="hidden sm:inline">&lt;!--</span>,
    <span className="sm:hidden">//</span>,
  ];
  const comment_suf = <span className="hidden sm:inline">--&gt;</span>;
  return (
    <div
      id="hero"
      className="z-0 w-screen h-screen max-w-full max-h-full bg-brand-gray-900"
    >
      <div
        id="hero-background"
        className="z-0 absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <CharacterNoise animationSpeed={5} seed={noise_seed} />
      </div>

      <div
        id="hero-container"
        className="z-10 flex items-end w-full h-full max-w-7xl mx-auto px-4 pt-4 pb-32"
      >
        <div id="hero-text" className="z-10 flex flex-col">
          <h6 className="text-base sm:text-xl italic text-brand-gray-300 leading-normal">
            {comment_pref} I like to make things {comment_suf}
          </h6>

          <h1 className="text-5xl leading-normal sm:text-8xl sm:leading-normal font-bold">
            DEVELOPER
          </h1>

          <h6 className="text-base sm:text-xl italic text-brand-gray-400 leading-normal">
            {comment_pref} And I like to make them{" "}
            {[
              { char: "g", hover: "purple" },
              { char: "o", hover: "green" },
              { char: "o", hover: "red" },
              { char: "d", hover: "blue" },
            ].map(({ char, hover }, idx) => {
              return (
                <span
                  key={idx}
                  className={`cursor-pointer font-bold hover:text-brand-${hover}`}
                >
                  {char}
                </span>
              );
            })}{" "}
            {comment_suf}
          </h6>

          <h1 className="text-5xl leading-normal sm:text-8xl sm:leading-normal font-bold">
            DESIGNER
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Hero;
