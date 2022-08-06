import "./Hero.css"

import CharacterNoise from "../Backgrounds/CharacterNoise/CharacterNoise"

type HeroProps = {}

function Hero(props: HeroProps) {
    // Splits each character of input string into individual spans
    const spanify = (text: string) => {
        return text.split("").map((char, i) => {
            return <span key={i}>{char}</span>
        })
    }

    return (
        <div id="hero">
            <div id="hero-background">
                <CharacterNoise />
            </div>

            <p className="corner corner-top-left">╔═</p>
            <p className="corner corner-top-right">═╗</p>
            <p className="corner corner-bottom-left">╚═</p>
            <p className="corner corner-bottom-right">═╝</p>

            <div id="hero-container">
                <div id="hero-text">
                    <h6 className="hero-subtitle">
                        &lt;!-- I like to make things --&gt;
                    </h6>

                    <h1 className="hero-title">&lt;/DEVELOPER&gt;</h1>
                    <h1 className="hero-title-sm">&lt;/DEV&gt;</h1>

                    <h6 className="hero-subtitle">
                        &lt;!-- And I like to make them look <span id="good">{spanify("GOOD")}</span> --&gt;
                    </h6>

                    <h1 className="hero-title">&lt;/DESIGNER&gt;</h1>
                    <h1 className="hero-title-sm">&lt;/DES&gt;</h1>
                </div>
            </div>
        </div>
    )
}

export default Hero;