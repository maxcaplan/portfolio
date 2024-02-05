import { RefObject, useEffect, useState } from "react";

/**
 * Observes an element and returns whether said element is currently sticky
 * @param ref - A ref object for the element to observe
 */
const useIsSticky = (ref: RefObject<HTMLElement>): boolean => {
	const [is_sticky, set_is_sticky] = useState(true);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([e]) => set_is_sticky(e.intersectionRatio === 1),
			{ threshold: 1 },
		);

		// Observe element
		if (ref.current) observer.observe(ref.current);

		return () => {
			if (ref.current) observer.unobserve(ref.current);
		};
	}, []);

	return is_sticky;
};

export default useIsSticky;
