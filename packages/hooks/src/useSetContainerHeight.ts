import { useEffect, useState } from "react";
import { useReactiveHeight } from "./useReactiveSize";

type ReturnType = {
  containerHeight: number;
};

export default function useSetContainerHeight(componentID: string): ReturnType {
  const [containerHeight, setContainerHeight] = useState(0);
  const scrollContainer = document.getElementById(componentID);
  const windowHeight = useReactiveHeight();
  const scrollContainerTop = scrollContainer?.getBoundingClientRect().top;

  useEffect(() => {
    const top = scrollContainerTop || 0;
    const height = windowHeight - top;
    setContainerHeight(height);
  }, [windowHeight, scrollContainer, scrollContainerTop]);

  return { containerHeight };
}
