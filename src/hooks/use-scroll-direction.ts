import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down";

export const useScrollDirection = (): ScrollDirection => {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const { scrollY } = window;

      if (Math.abs(scrollY - lastScrollY) > 5) {
        setScrollDir(scrollY > lastScrollY ? "down" : "up");
        lastScrollY = scrollY > 0 ? scrollY : 0;
      }
    };

    window.addEventListener("scroll", updateScrollDir);

    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  return scrollDir;
}

