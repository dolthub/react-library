import { useFeaturesContext } from "./feature";

type Props = {
  name: string;
  children: JSX.Element;
  notFound?: JSX.Element;
  show?: boolean;
};

export default function FeatureGate({
  name,
  children,
  notFound,
  show,
}: Props): JSX.Element | null {
  const { features } = useFeaturesContext();
  const showFeature = features.get(name);
  if (showFeature === undefined || showFeature || show) return children;
  return notFound ?? null;
}
