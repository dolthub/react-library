import { useEffect, useState } from "react";

export default function useIsVisible(id: string): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const target = document.querySelector(id);
    if (!target) return () => null;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [document]);

  return isIntersecting;
}
