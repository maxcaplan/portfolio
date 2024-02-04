import { Link } from "react-router-dom";

interface NavLinksProps {
  homePage?: boolean;
  className?: string;
}

export default function NavLinks(props: NavLinksProps) {
  type LinkInfo = {
    name: string;
    href: string;
    className: string;
    hidden?: boolean;
  };

  /** Navigation link information for the list */
  const link_info: LinkInfo[] = [
    {
      name: "work",
      href: "#work",
      className: "hover:underline hover:decoration-brand-blue",
    },
    {
      name: "skills",
      href: "#skills",
      className: "hover:underline hover:decoration-brand-green",
      hidden: true,
    },
    {
      name: "about",
      href: "#about",
      className: "hover:underline hover:decoration-brand-purple",
    },
    {
      name: "contact",
      href: "#contact",
      className: "hover:underline hover:decoration-brand-red",
    },
  ];

  const NavLink = ({
    link,
    homePage,
  }: {
    link: LinkInfo;
    homePage?: boolean;
  }) => {
    const nav_link_class_name =
      "transtion duration-200 decoration-[1.5px] decoration-wavy underline-offset-4 hover:text-brand-white";
    if (homePage) {
      return (
        <a
          href={link.href}
          className={`${nav_link_class_name} ${link.className} ${link.hidden ? "hidden" : ""}`}
        >
          {link.name}
        </a>
      );
    } else {
      return (
        <Link
          to={`/${link.href}`}
          className={`${nav_link_class_name} ${link.className} ${link.hidden ? "hidden" : ""}`}
          reloadDocument={true}
        >
          {link.name}
        </Link>
      );
    }
  };

  return (
    <div
      className={`no-underline text-brand-gray-200 ${props.className || ""}`}
    >
      {link_info.map((link, idx) => (
        <NavLink key={`navlink-${idx}`} link={link} homePage={props.homePage} />
      ))}
    </div>
  );
}
