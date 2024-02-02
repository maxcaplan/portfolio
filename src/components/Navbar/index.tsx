import { Link } from "react-router-dom";
import logoDark from "../../assets/logo/logo_dark.svg";
import logoSmDark from "../../assets/logo/logo_sm_dark.svg";

export default function Navbar() {
  return (
    <div className="w-full border-b border-brand-gray-700">
      <div className="w-full max-w-6xl mx-auto flex flex-row px-6">
        <div className="py-4">
          <Link to="/">
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
          </Link>
        </div>

        <div className="flex-grow flex justify-end">
          <div className="flex flex-row gap-x-4 items-center pl-6 py-4 border-l border-brand-gray-700">
            <Link to="/">
              <span className="decoration-[1.5px] decoration-wavy underline-offset-4 text-brand-gray-200 hover:text-brand-white hover:underline hover:decoration-brand-blue transtion duration-200">
                home
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
