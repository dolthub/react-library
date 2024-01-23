import { ReactNode } from "react";
import { useFeaturesContext } from "./feature";

type Props = {
  name: string;
  children: ReactNode;
  notFound?: ReactNode;
  show?: boolean;
};

export default function FeatureGate({
  name,
  children,
  notFound = null,
  show,
}: Props): ReactNode {
  const { features } = useFeaturesContext();
  const showFeature = features.get(name);
  if (showFeature === undefined || showFeature || show) return children;
  return notFound;
}
