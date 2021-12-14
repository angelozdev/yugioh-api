import { RefObject, useEffect, useState } from "react";

interface OptionMethods {
  onVisible?: () => void;
  onHidden?: () => void;
  onChange?: (isVisible: boolean) => void;
}

function useIntersectionObserver(
  elementRef: RefObject<HTMLElement>,
  { onVisible, onHidden, onChange }: OptionMethods,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      const { isIntersecting } = entry;
      setIsIntersecting(isIntersecting);
      isIntersecting ? onVisible?.() : onHidden?.();
      onChange?.(isIntersecting);
    }, options);

    element && observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, options, onChange, onHidden, onVisible]);

  return isIntersecting;
}

export default useIntersectionObserver;
