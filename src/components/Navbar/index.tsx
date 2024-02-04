import { Link } from "react-router-dom";
import logoDark from "../../assets/logo/logo_dark.svg";
import logoSmDark from "../../assets/logo/logo_sm_dark.svg";
import NavLinks from "../common/NavLinks";

interface NavbarProps {
  homePage?: boolean;
  className?: string;
}

export default function Navbar(props: NavbarProps) {
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
    <div
      className={`w-full border-b border-brand-gray-700 bg-brand-gray-900 ${props.className || ""}`}
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
          <NavLinks
            homePage={props.homePage}
            className="flex flex-row gap-x-4 items-center pl-6 py-4 border-l border-brand-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
