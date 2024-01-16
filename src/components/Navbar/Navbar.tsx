import logoDark from "../../assets/logo/logo_dark.svg";
import logoSmDark from "../../assets/logo/logo_sm_dark.svg";

type NavbarProps = {};

export function Navbar(props: NavbarProps) {
  type NavLink = {
    name: string;
    href: string;
    hover_class: string;
  };

  /** Navigation link information for the navbar */
  const nav_links: NavLink[] = [
    {
      name: "work",
      href: "#work",
      hover_class: "hover:underline hover:decoration-brand-purple",
    },
    {
      name: "skills",
      href: "#skills",
      hover_class: "hover:underline hover:decoration-brand-blue",
    },
    {
      name: "about",
      href: "#about",
      hover_class: "hover:underline hover:decoration-brand-green",
    },
    {
      name: "contact",
      href: "#contact",
      hover_class: "hover:underline hover:decoration-brand-red",
    },
  ];

  /**
   * Returns a list of elements for an array of NavLinks
   * @param {NavLink[]} nav_links - The array of NavLinks to generate the elements for
   */
  const render_nav_links = (nav_links: NavLink[]) => {
    return nav_links.map((link, idx) => {
      const elements: JSX.Element[] = [];

      elements.push(
        <a
          key={`a${idx}`}
          href={link.href}
          className={`
		  transtion 
		  duration-200 
		  decoration-[1.5px] 
		  decoration-wavy 
		  hover:text-brand-white 
		  ${link.hover_class}`}
        >
          {link.name}
        </a>,
      );

      if (idx < nav_links.length - 1)
        elements.push(
          <p key={`s${idx}`} className="hidden md:inline">
            /
          </p>,
        );

      return elements;
    });
  };

  return (
    <div id="navbar" className="z-50 absolute left-0 top-0 w-full">
      <div
        id="navbar-container"
        className="w-full h-full max-w-7xl mx-auto p-4 flex flex-row items-center"
      >
        <img
          src={logoDark}
          alt="logo"
          id="navbar-logo"
          className="hidden md:flex self-stretch h-12"
        />
        <img
          src={logoSmDark}
          alt="logo"
          id="navbar-logo-sm"
          className="flex md:hidden self-stretch h-12"
        />

        <div id="navbar-right" className="w-full flex flex-row justify-end">
          <div
            id="navbar-links"
            className="flex flex-col md:flex-row items-end md:items-center gap-4 no-underline text-brand-gray-200"
          >
            {render_nav_links(nav_links)}
          </div>

          {/*<button id="hamburger">///</button>*/}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
