import { useEffect } from "react";

/**
 * Scrolls to element with id matching a hash after page load
 * @param hash - The hash to scroll to. Starts with #
 */
const useScrollToHash = (hash: string) => {
  // On component mounted
  useEffect(() => {
    if (hash.length > 0) {
      const scroll_to_el = document.querySelector(hash);
      if (scroll_to_el !== null) {
        scroll_to_el.scrollIntoView();
      }
    }
  }, []);
};

export default useScrollToHash;
