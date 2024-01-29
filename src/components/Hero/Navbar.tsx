import logoDark from "../../assets/logo/logo_dark.svg";
import logoSmDark from "../../assets/logo/logo_sm_dark.svg";

type NavbarProps = {};

export function Navbar(props: NavbarProps) {
  type NavLink = {
    name: string;
    href: string;
    hover_class: string;
    hidden?: boolean;
  };

  /** Navigation link information for the navbar */
  const nav_links: NavLink[] = [
    {
      name: "work",
      href: "#work",
      hover_class: "hover:underline hover:decoration-brand-blue",
    },
    {
      name: "skills",
      href: "#skills",
      hover_class: "hover:underline hover:decoration-brand-green",
      hidden: true,
    },
    {
      name: "about",
      href: "#about",
      hover_class: "hover:underline hover:decoration-brand-purple",
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
        <span className={`group ${link.hidden ? "hidden" : ""}`}>
          <span className="hidden">&gt; </span>
          <a
            key={`a${idx}`}
            href={link.href}
            className={`
		  transtion 
		  duration-200 
		  decoration-[1.5px] 
		  decoration-wavy 
		  underline-offset-4
		  hover:text-brand-white 
		  ${link.hover_class}`}
          >
            {link.name}
          </a>
        </span>,
      );

      return elements;
    });
  };

  return (
    <div id="navbar" className="z-50 w-full">
      <div
        id="navbar-container"
        className="w-full h-full flex flex-row items-center"
      >
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

        <div id="navbar-right" className="w-full flex flex-row justify-end">
          <div
            id="navbar-links"
            className="flex flex-col items-end gap-4 no-underline text-brand-gray-200"
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
