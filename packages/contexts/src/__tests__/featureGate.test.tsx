import { render, screen } from "@testing-library/react";
import React from "react";
import FeatureProvider, { FeatureMap } from "../features/feature";
import FeatureGate from "../features/featureGate";

const getFeatures = (isDev = false): FeatureMap =>
  new Map([
    ["bounties", true],
    ["test", false],
    ["marketing", isDev],
  ]);

function renderProvider(props: {
  name: string;
  notFound?: React.ReactNode;
  isDev?: boolean;
  showAll?: boolean;
  show?: boolean;
}) {
  render(
    <FeatureProvider
      featureMap={getFeatures(props.isDev)}
      showAll={props.showAll}
    >
      <div>
        <FeatureGate
          name={props.name}
          notFound={props.notFound}
          show={props.show}
        >
          <div>Hidden</div>
        </FeatureGate>
        <div>Visible</div>
      </div>
    </FeatureProvider>,
  );
}

describe("test FeatureGate", () => {
  it("renders FeatureGate and hides children", () => {
    renderProvider({ name: "test" });

    expect(screen.getByText("Visible")).toBeVisible();
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });

  it("renders FeatureGate and hides children and shows notFound", () => {
    renderProvider({ name: "test", notFound: <div>Not Found</div> });

    expect(screen.getByText("Visible")).toBeVisible();
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
    expect(screen.getByText("Not Found")).toBeVisible();
  });

  it("renders FeatureGate and shows child", () => {
    renderProvider({ name: "test", show: true });

    expect(screen.getByText("Visible")).toBeVisible();
    expect(screen.getByText("Hidden")).toBeVisible();
  });

  it("renders FeatureGate and shows all", () => {
    renderProvider({ name: "test", showAll: true });

    expect(screen.getByText("Visible")).toBeVisible();
    expect(screen.getByText("Hidden")).toBeVisible();
  });

  it("renders FeatureGate and shows component for non-feature", () => {
    renderProvider({ name: "other" });

    expect(screen.getByText("Visible")).toBeVisible();
    expect(screen.getByText("Hidden")).toBeVisible();
  });

  it("renders FeatureGate and shows component for dev", () => {
    renderProvider({ name: "marketing", isDev: true });

    expect(screen.getByText("Visible")).toBeVisible();
    expect(screen.queryByText("Hidden")).toBeVisible();
  });

  it("renders FeatureGate and hides component for non-dev", () => {
    renderProvider({ name: "marketing" });

    expect(screen.getByText("Visible")).toBeVisible();
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });

  it("throws error if FeatureGate rendered without FeatureProvider component", () => {
    expect(() => {
      render(
        <div>
          <FeatureGate name="test" show>
            <div>Hidden</div>
          </FeatureGate>
          <div>Visible</div>
        </div>,
      );
    }).toThrow();
  });
});
