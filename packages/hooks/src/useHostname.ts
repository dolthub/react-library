import { useEffect, useState } from "react";

// getHostFn is a function that returns the host to use based on location.hostname.
export default function useHostname(
  getHostFn: () => string,
  defaultHost = "",
): string {
  const [host, setHost] = useState(defaultHost);
  const [setOnce, setSetOnce] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !setOnce) {
      setHost(getHostFn());
      setSetOnce(true);
    }
  }, [host, setHost, getHostFn]);

  return host;
}
