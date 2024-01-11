import cookie from "js-cookie";
import { useEffect, useState } from "react";

export default function useIsSignedIn(tokenKey: string): boolean {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(!!cookie.get(tokenKey));
  });

  return isSignedIn;
}
