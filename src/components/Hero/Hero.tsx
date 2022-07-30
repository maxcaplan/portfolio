import "./Hero.css"

type HeroProps = {}

export function Hero(props: HeroProps) {

    // Splits each character of input string into individual spans
    const spanify = (text: string) => {
        return text.split("").map(char => {
            return <span>{char}</span>
        })
    }

    return (
        <div id="hero">
            <p className="corner corner-top-left">╔═</p>
            <p className="corner corner-top-right">═╗</p>
            <p className="corner corner-bottom-left">╚═</p>
            <p className="corner corner-bottom-right">═╝</p>

            <div id="hero-container">
                <div id="hero-text">
                    <h5 className="hero-subtitle">
                        &lt;!-- I like to make things --&gt;
                    </h5>
                    <h1 className="hero-title">&lt;/DEVELOPER&gt;</h1>

                    <h5 className="hero-subtitle">
                        &lt;!-- And I like to make them look <span id="good">{spanify("GOOD")}</span> --&gt;
                    </h5>

                    <h1 className="hero-title">&lt;/DESIGNER&gt;</h1>
                </div>
            </div>
        </div>
    )
}