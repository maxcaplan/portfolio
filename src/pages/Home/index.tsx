import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Hooks
import useIsSticky from "../../utils/hooks/useIsSticky";
import useScrollToHash from "../../utils/hooks/useScrollToHash";

// Components
import PageWrapper from "../../components/common/PageWrapper";
import Navbar from "../../components/Navbar";
import Hero from "../../components/home/Hero";
import Footer from "../../components/Footer";

// Page Sections
import Sections from "../../components/home/sections";
import Contact from "../../components/home/sections/Contact";

function Home() {
	const hero_ref = useRef<HTMLDivElement>(null);
	const is_hero_sticky = useIsSticky(hero_ref);
	const [is_at_top, set_is_at_top] = useState(true);

	// Scroll to section with matching url hash on page loaded
	const location = useLocation();
	useScrollToHash(location.hash);

	const handle_scroll = () => {
		set_is_at_top(window.scrollY === 0);
	};

	// On component mounted
	useEffect(() => {
		handle_scroll();

		// Update is at top state on scroll
		window.addEventListener("scroll", handle_scroll);

		return () => {
			window.removeEventListener("scroll", handle_scroll);
		};
	}, []);

	return (
		<PageWrapper>
			<Navbar
				homePage={true}
				className={`fixed top-0 left-0 z-[100] opacity-0 transition-opacity duration-200 ${is_hero_sticky ? "xl:opacity-0 xl:pointer-events-none" : "xl:opacity-100"} ${is_at_top ? "opacity-0 pointer-events-none" : "opacity-100"}`}
			/>
			<div className="w-full h-full flex flex-col gap-y-20">
				<div className="flex flex-col xl:grid xl:grid-cols-3 xl:grid-flow-row w-full border-b border-brand-gray-700">
					<div className="relative xl:col-span-1 flex flex-row w-full border-b xl:border-r border-brand-gray-700">
						<Hero ref={hero_ref} className="sticky top-0" />
					</div>

					<Sections className="relative xl:col-span-2 flex flex-col gap-y-20 w-full pt-6 pb-20" />
				</div>

				<Contact sectionNumber={4} />

				<Footer />
			</div>
		</PageWrapper>
	);
}

export default Home;
