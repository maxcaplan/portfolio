import { PropsWithChildren } from "react"

interface ContentLinkProps extends PropsWithChildren {
  href: string,
}
export const ContentLink = (props: ContentLinkProps) => {
  return <a
    className="flex flex-row gap-2 px-2 py-1 rounded border border-brand-gray-400 bg-brand-gray-800 hover:bg-brand-gray-700 transition duration-100 cursor-pointer"
    href={props.href}
    target="_blank"
  >
    {props.children}
  </a>

}

const ContentLinks = (props: { sourceHref?: string, demoHref?: string }) => {
  let links: JSX.Element[] = []

  if (props.sourceHref !== undefined && props.sourceHref !== "")
    links.push(
      <ContentLink href={props.sourceHref}>
        source
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-code" > <polyline points="16 18 22 12 16 6" > </polyline><polyline points="8 6 2 12 8 18"></polyline > </svg>
      </ContentLink>
    )

  if (props.demoHref !== undefined && props.demoHref !== "")
    links.push(
      <ContentLink href={props.demoHref}>
        demo
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-terminal" > <polyline points="4 17 10 11 4 5" > </polyline><line x1="12" y1="19" x2="20" y2="19"></line > </svg>
      </ContentLink>
    )

  return links
}

export default ContentLinks 
