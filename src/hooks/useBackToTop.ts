import { useCallback, useEffect, useState } from "react";

function useBackToTop({ threshold = 0 }) {
  const [isVisible, setIsVisible] = useState(false);

  const onBackToTop = useCallback(() => {
    if (window.scrollY > threshold) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [threshold]);

  useEffect(() => {
    const handleScroll = () => {
      const isVisible = window.scrollY > threshold;
      setIsVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { isVisible, onBackToTop };
}

export default useBackToTop;
