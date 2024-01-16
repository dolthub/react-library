import { useEffect, useState } from "react";

// getUrlFn is a function that returns the base url based on location.hostname.
export default function useBaseUrl(
  getUrlFn: () => string,
  defaultUrl = "",
): string {
  const [url, setUrl] = useState(defaultUrl);
  const [setOnce, setSetOnce] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !setOnce) {
      setUrl(getUrlFn());
      setSetOnce(true);
    }
  }, [url, setUrl, getUrlFn]);

  return url;
}
