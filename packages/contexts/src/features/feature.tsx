import { useContextWithError } from "@dolthub/react-hooks";
import React, { ReactNode, useMemo } from "react";
import { createCustomContext } from "../createCustomContext";

export type FeatureMap = Map<string, boolean>;

type FeatureContextType = {
  features: FeatureMap;
};

export const FeatureContext =
  createCustomContext<FeatureContextType>("FeatureContext");

export function getFeatures(
  featMap: FeatureMap,
  showAll?: boolean,
): FeatureMap {
  if (showAll) return getFeaturesForShowAll(featMap);
  return featMap;
}

export function getFeaturesForShowAll(featMap: FeatureMap): FeatureMap {
  const map = featMap;
  map.forEach((_, key) => map.set(key, true));
  return map;
}

type Props = {
  children: ReactNode;
  showAll?: boolean;
  featureMap: FeatureMap;
};

export default function FeatureProvider({
  children,
  showAll,
  featureMap,
}: Props) {
  const value = useMemo(() => {
    return {
      features: getFeatures(featureMap, showAll),
    };
  }, [featureMap, showAll]);

  return (
    <FeatureContext.Provider value={value}>{children}</FeatureContext.Provider>
  );
}

export function useFeaturesContext(): FeatureContextType {
  return useContextWithError(FeatureContext);
}
