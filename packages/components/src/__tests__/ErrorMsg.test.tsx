import { initialUppercase } from "@dolthub/web-utils";
import { render, screen } from "@testing-library/react";
import React from "react";
import ErrorMsg from "../ErrorMsg";
import ErrorProvider from "../ErrorMsg/context";

const errMsg = "Shit, something went wrong";
const improve = (m: string) => initialUppercase(m.replace("Shit, ", ""));
const improvedMsg = "Something went wrong";
function Custom(props: { className?: string }) {
  return <div className={props.className}>Custom message</div>;
}
const renderDifferentComp = (m: string) => {
  if (m === improvedMsg) {
    return <Custom />;
  }
  return null;
};

describe("test ErrorMsg", () => {
  it("works without context for err", () => {
    render(<ErrorMsg err={new Error(errMsg)} />);
    expect(screen.getByText(errMsg)).toBeInTheDocument();
  });

  it("works without context for errString", () => {
    render(<ErrorMsg errString={errMsg} />);
    expect(screen.getByText(errMsg)).toBeInTheDocument();
  });

  it("renders the err if both err and errString provided", () => {
    render(<ErrorMsg errString={improvedMsg} err={new Error(errMsg)} />);
    expect(screen.getByText(errMsg)).toBeInTheDocument();
    expect(screen.queryByText(improvedMsg)).not.toBeInTheDocument();
  });

  it("improves err", () => {
    render(
      <ErrorProvider improveErrorMsgFn={improve}>
        <ErrorMsg err={new Error(errMsg)} />
      </ErrorProvider>,
    );
    expect(screen.getByText(improvedMsg)).toBeInTheDocument();
  });

  it("improves errString", () => {
    render(
      <ErrorProvider improveErrorMsgFn={improve}>
        <ErrorMsg errString={errMsg} />
      </ErrorProvider>,
    );
    expect(screen.getByText(improvedMsg)).toBeInTheDocument();
  });

  it("improves err for timeout", () => {
    render(
      <ErrorProvider improveErrorMsgFn={improve}>
        <ErrorMsg err={new Error("upstream request timeout")} />
      </ErrorProvider>,
    );
    expect(
      screen.getByText("Request timed out. Please try again."),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("upstream request timeout"),
    ).not.toBeInTheDocument();
  });

  it("handles a different component that matches", () => {
    render(
      <ErrorProvider renderDifferentComp={renderDifferentComp}>
        <ErrorMsg errString={improvedMsg} className="class-name" />
      </ErrorProvider>,
    );
    const el = screen.getByText("Custom message");
    expect(el).toBeVisible();
    expect(screen.queryByText(improvedMsg)).not.toBeInTheDocument();
    expect(el).toHaveClass(/errorMsg/, /class-name/);
  });

  it("handles a different component that does not match", () => {
    render(
      <ErrorProvider renderDifferentComp={renderDifferentComp}>
        <ErrorMsg errString={errMsg} />
      </ErrorProvider>,
    );
    expect(screen.queryByText("Custom message")).not.toBeInTheDocument();
    expect(screen.getByText(errMsg)).toBeVisible();
  });

  it("returns nothing if no err", () => {
    render(<ErrorMsg err={undefined} />);
    expect(screen.queryByLabelText("error-msg")).not.toBeInTheDocument();
  });

  it("returns nothing if no errString", () => {
    render(<ErrorMsg errString="" />);
    expect(screen.queryByLabelText("error-msg")).not.toBeInTheDocument();
  });
});
