import { useEffect, useRef, useState } from "react";

import SectionHeader from "../SectionHeader";
import ContactGrid from "./ContactGrid";
import EmailForm from "./EmailForm";
import { Link } from "react-router-dom";

interface ContactProps {
	sectionNumber: number
}

interface SocialLink {
	name: string,
	href: string,
	icon: JSX.Element,
	className?: string,
	routerLink?: boolean
}

/** Home page contact section component */
export default function Contact(props: ContactProps) {
	const [do_fade_in, set_do_fade_in] = useState(false);

	const trigger_ref = useRef<HTMLDivElement>(null);

	// Component did mount
	useEffect(() => {
		if (!trigger_ref.current) {
			set_do_fade_in(true);
			return;
		}

		// Start animations when section is visible
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				set_do_fade_in(true);
				if (trigger_ref.current) observer.unobserve(trigger_ref.current);
			}
		});

		observer.observe(trigger_ref.current);

		return () => {
			if (trigger_ref.current) observer.unobserve(trigger_ref.current);
		};
	}, []);

	const links: SocialLink[] = [
		{
			name: "github",
			href: "https://github.com/maxcaplan",
			className: "group-hover/social-button:border-brand-purple",
			icon: (
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
					role="img"
				>
					<title>Github</title>
					<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
					<path d="M9 18c-4.51 2-5-2-7-2" />
				</svg>
			),
		},

		{
			name: "linkedin",
			href: "https://www.linkedin.com/in/max-caplan/",
			className: "group-hover/social-button:border-brand-blue",
			icon: (
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
					role="img"
				>
					<title>Linkedin</title>
					<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
					<rect width="4" height="12" x="2" y="9" />
					<circle cx="4" cy="4" r="2" />
				</svg>
			),
		},

		{
			name: "resume",
			href: "/resume",
			routerLink: true,
			className: "group-hover/social-button:border-brand-green",
			icon: (
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
					role="img"
				>
					<title>Resume</title>
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
					<polyline points="14 2 14 8 20 8"></polyline>
					<line x1="16" y1="13" x2="8" y2="13"></line>
					<line x1="16" y1="17" x2="8" y2="17"></line>
					<polyline points="10 9 9 9 8 9"></polyline>
				</svg>
			),
		},
	];

	const link_buttons = (links: SocialLink[]) => {
		return links.map((link, idx) => {
			return (
				<LinkWrapper key={idx} link={link} className={`group/social-button relative grow flex flex-row justify-center items-center gap-2 px-4 py-4 rounded border border-brand-gray-300 bg-brand-gray-800`}>
					<div className={`-z-10 absolute -bottom-2 -left-2 group-hover/social-button:-translate-x-2 group-hover/social-button:translate-y-2 w-full h-full rounded border border-brand-gray-300 bg-brand-gray-800 transition duration-200 hidden lg:block ${link.className}`}></div>
					{link.icon}
					<span className="text-xl leading-none">{link.name}</span>
				</LinkWrapper>
			)
		})
	}

	const LinkWrapper = (props: React.PropsWithChildren<{ link: SocialLink, className?: string }>) => {
		if (props.link.routerLink) {
			return (
				<Link to={props.link.href} className={props.className}>
					{props.children}
				</Link >
			)
		} else {
			return (
				<a href={props.link.href} target="_blank" className={props.className}>
					{props.children}
				</a>
			)
		}
	}

	return (
		<div
			id="contact"
			className="relative flex flex-col gap-y-20 w-full max-w-6xl mx-auto px-6"
		>
			<div
				ref={trigger_ref}
				className="absolute top-1/2 left-1/2 invisible"
			></div>

			<SectionHeader
				title="contact"
				number={props.sectionNumber}
				className="decoration-brand-red"
			/>

			<div className="z-0 flex flex-col gap-y-8">
				<div className="w-full lg:grid lg:grid-cols-2 lg:gap-x-8">
					<div className="hidden lg:block col-span-1">
						<ContactGrid />
					</div>

					<div
						className={`w-full lg:col-span-1 ${do_fade_in ? "animate-fade-in-up" : "opacity-0"
							}`}
					>
						<div className="w-full h-full overflow-hidden rounded shadow border border-brand-gray-300">
							<div className="relative flex items-center justify-center p-2 border-b border-brand-gray-300 bg-brand-gray-700">
								{/* Mail icon */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="absolute left-0 ml-2 stroke-brand-white"
								>
									<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
									<polyline points="22,6 12,13 2,6"></polyline>
								</svg>

								<p className="text-sm">
									form <span className="hidden sm:inline">~/contact/</span>
									<span className="inline sm:hidden">~/c/</span>
									email
								</p>

								<div className="absolute right-0 flex flex-row items-center gap-x-2 lg:gap-x-4 mr-2">
									{/* Minus icon */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="stroke-brand-white"
									>
										<line x1="5" y1="12" x2="19" y2="12"></line>
									</svg>

									{/* Maximize icon */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="stroke-brand-white"
									>
										<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
									</svg>

									{/* Close icon */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="stroke-brand-white"
									>
										<line x1="18" y1="6" x2="6" y2="18"></line>
										<line x1="6" y1="6" x2="18" y2="18"></line>
									</svg>
								</div>
							</div>

							<div className="bg-brand-gray-800 p-4">
								<EmailForm />
							</div>
						</div>
					</div>
				</div>

				<div className="w-full flex justify-center items-center gap-6">
					<div className="flex-grow border-b border-brand-gray-600" />

					<h4 className="text-3xl font-bold">more</h4>

					<div className="flex-grow border-b border-brand-gray-600" />
				</div>


				<div className="flex flex-col lg:flex-row gap-3 lg:gap-8">
					{link_buttons(links)}
				</div>
			</div>
		</div>
	);
}
