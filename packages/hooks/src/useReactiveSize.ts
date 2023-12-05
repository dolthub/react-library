import { useEffect, useState } from "react";
import useEffectOnMount from "./useEffectOnMount";

export function useReactiveHeight<E extends HTMLElement>(
  elem?: E | null,
): E["clientHeight"] {
  const [clientHeight, setClientHeight] = useState(elem?.clientHeight ?? 0);

  useEffectOnMount(() => {
    const handleResize = () =>
      setClientHeight(elem?.clientHeight ?? window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (elem) {
      setClientHeight(elem.clientHeight);
    }
  }, [elem]);

  return clientHeight;
}

export function useReactiveWidth<E extends HTMLElement>(
  elem?: E | null,
  mobileBreakpoint = 768,
): { clientWidth: E["clientWidth"]; isMobile: boolean } {
  const [clientWidth, setClientWidth] = useState(elem?.clientWidth ?? 0);

  useEffectOnMount(() => {
    setClientWidth(elem?.clientWidth ?? window.innerWidth);
    const handleResize = () =>
      setClientWidth(elem?.clientWidth ?? window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (elem) {
      setClientWidth(elem.clientWidth);
    }
  }, [elem]);

  const isMobile = !(clientWidth >= mobileBreakpoint);

  return { clientWidth, isMobile };
}

export function useReactiveScrollWidth<E extends HTMLElement>(
  elem?: E | null,
): { scrollWidth: E["scrollWidth"]; windowInnerWidth: Window["innerWidth"] } {
  const [scrollWidth, setScrollWidth] = useState(elem?.scrollWidth ?? 0);
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);

  useEffectOnMount(() => {
    const handleResize = () => {
      setScrollWidth(elem?.scrollWidth ?? 0);
      setWindowInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (elem) {
      setScrollWidth(elem.scrollWidth);
    }
  }, [elem]);

  return { scrollWidth, windowInnerWidth };
}
