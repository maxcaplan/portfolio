import "./Navbar.css"

import logoDark from "../../assets/logo/logo_dark.svg"
import logoSmDark from "../../assets/logo/logo_sm_dark.svg"

type NavbarProps = {}

export function Navbar(props: NavbarProps) {
    return (
        <div id="navbar">
            <div id="navbar-container">
                <img src={logoDark} alt="logo" id="navbar-logo" />
                <img src={logoSmDark} alt="logo" id="navbar-logo-sm" />

                <div id="navbar-right">
                    <div id="navbar-links">
                        <a className="navbar-link navbar-link-home" href="#">~</a>
                        <p className="navbar-slash">/</p>
                        <a href="#" className="navbar-link navbar-link-purple">about</a>
                        <p className="navbar-slash">/</p>
                        <a href="#" className="navbar-link navbar-link-green">skills</a>
                        <p className="navbar-slash">/</p>
                        <a href="#" className="navbar-link navbar-link-red">work</a>
                        <p className="navbar-slash">/</p>
                        <a href="#" className="navbar-link navbar-link-teal">contact</a>
                        <p className="navbar-slash">/</p>
                        <a href="https://github.com/maxcaplan/portfolio" target="_blank" className="navbar-link navbar-link-source">&#9675;</a>
                    </div>

                    <button id="hamburger">
                        ///
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;