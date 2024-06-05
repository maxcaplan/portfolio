import { Link } from "react-router-dom";
import logoDark from "../../assets/logo/logo_dark.svg";
import logoSmDark from "../../assets/logo/logo_sm_dark.svg";
import NavLinks from "../common/NavLinks";
import { useState } from "react";

interface NavbarProps {
  homePage?: boolean;
  className?: string;
}

export default function Navbar(props: NavbarProps) {
  let [menu_open, set_menu_open] = useState(false)

  /**
   * Returns either a router link or button depending on if it is the homepage
   */
  const LogoWrapper = ({
    children,
    homePage,
  }: {
    children: React.ReactNode;
    homePage?: boolean;
  }) => {
    if (homePage === true) {
      return <button onClick={() => window.scrollTo(0, 0)}>{children}</button>;
    } else {
      return <Link to="/">{children}</Link>;
    }
  };

  return (
    <div className={`z-10 w-full ${props.className || "relative"}`}>
      {/** Menu drawer */}
      <div className={`-z-10 box-border absolute w-full h-fit bottom-0 border-b border-brand-gray-700 bg-brand-gray-900 transition-transform duration-200 ${menu_open ? "translate-y-[100%]" : ""}`}>

        <NavLinks
          homePage={props.homePage}
          className="flex flex-col gap-y-4 px-6 py-4"
        />
      </div>

      {/** Navbar */}
      <div
        className={`z-10 w-full border-b border-brand-gray-700 bg-brand-gray-900`}
      >
        <div className="w-full max-w-6xl mx-auto flex flex-row px-6">
          <div className="py-4 flex items-center">
            <LogoWrapper homePage={props.homePage}>
              <img
                src={logoDark}
                alt="logo"
                id="navbar-logo"
                className="hidden md:flex self-stretch h-8"
              />
              <img
                src={logoSmDark}
                alt="logo"
                id="navbar-logo-sm"
                className="flex md:hidden self-stretch h-8"
              />
            </LogoWrapper>
          </div>

          <div className="flex-grow flex justify-end">
            <div className="flex flex-row items-center pl-6 py-4 border-l border-brand-gray-700">
              <button
                className="flex justify-center items-center aspect-square p-1 rounded hover:bg-brand-gray-700 stroke-brand-white md:hidden"
                onClick={() => set_menu_open(!menu_open)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`stroke-current transition-transform duration-200 ${menu_open ? "rotate-90" : ""}`}
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18">
                  </line>
                </svg>
              </button>

              <NavLinks
                homePage={props.homePage}
                className="flex-row gap-x-4 hidden md:flex"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
