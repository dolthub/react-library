import { useEffect, useState } from "react";

// getUrlFn is a function that returns the base url based on location.hostname.
export default function useBaseUrl(
  getUrlFn: () => string,
  defaultHost = "",
): string {
  const [host, setHost] = useState(defaultHost);
  const [setOnce, setSetOnce] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !setOnce) {
      setHost(getUrlFn());
      setSetOnce(true);
    }
  }, [host, setHost, getUrlFn]);

  return host;
}
