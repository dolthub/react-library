import { useEffect, useRef } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

export default function useInterval(
  callback: () => void,
  delayMs: number | null,
): void {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delayMs && delayMs !== 0) {
      return () => undefined;
    }

    const id = setInterval(() => savedCallback.current(), delayMs);

    return () => clearInterval(id);
  }, [delayMs]);
}
