import { useEffect } from "react";

export default function useEffectOnMount(fn: () => void) {
  useEffect(fn, []);
}
