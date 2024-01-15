import CharacterNoise from "../Backgrounds/CharacterNoise/CharacterNoise";
import CharacterPixel from "../Backgrounds/CharacterNoise/CharacterPixel";

type HeroProps = {};

const noise_seed = Date.now();

function Hero(props: HeroProps) {
  /** Splits each character of input string into individual spans */
  const spanify = (text: string) => {
    return text.split("").map((char, i) => {
      return <span key={i}>{char}</span>;
    });
  };

  return (
    <div
      id="hero"
      className="w-screen h-screen max-w-full max-h-full bg-brand-gray-900"
    >
      <div
        id="hero-background"
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <CharacterPixel
          characters={["\u00A0", "\u00A0", "░", "▒", "▓", "▓"]}
          brightness={1}
        />
        {/*<CharacterNoise animationSpeed={5} seed={noise_seed} />*/}
      </div>

      {/*<p className="corner corner-top-left">╔═</p>
			<p className="corner corner-top-right">═╗</p>
			<p className="corner corner-bottom-left">╚═</p>
			<p className="corner corner-bottom-right">═╝</p>*/}

      <div
        id="hero-container"
        className="flex items-end w-full h-full max-w-7xl mx-auto px-4 pt-4 pb-32"
      >
        <div id="hero-text" className="flex flex-col">
          <h6 className="text-xl italic text-brand-gray-300 leading-normal">
            &lt;!-- I like to make things --&gt;
          </h6>

          <h1 className="text-8xl font-bold leading-normal">DEVELOPER</h1>
          {/*<h1 className="hero-title-sm">&lt;/DEV&gt;</h1>*/}

          <h6 className="text-xl italic text-brand-gray-400 leading-normal">
            &lt;!-- And I like to make them{" "}
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
            --&gt;
          </h6>

          <h1 className="text-8xl font-bold leading-normal">DESIGNER</h1>
          {/*<h1 className="hero-title-sm">&lt;/DES&gt;</h1>*/}
        </div>
      </div>
    </div>
  );
}

export default Hero;
