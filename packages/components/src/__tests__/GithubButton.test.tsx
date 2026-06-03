import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import GithubButton from "../TransparentButtonWithIcon/ForGithub";

describe("test GithubButton star count formatting", () => {
  it("formats thousands compactly by default", () => {
    render(<GithubButton href="github.com" githubStarCount={10900} />);
    expect(screen.getByText("10.9k")).toBeInTheDocument();
  });

  it("formats millions compactly", () => {
    render(<GithubButton href="github.com" githubStarCount={2500000} />);
    expect(screen.getByText("2.5m")).toBeInTheDocument();
  });

  it("shows small counts without a decimal", () => {
    render(<GithubButton href="github.com" githubStarCount={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("honors a custom formatStarCount", () => {
    render(
      <GithubButton
        href="github.com"
        githubStarCount={1234}
        formatStarCount={n => `${n} stars`}
      />,
    );
    expect(screen.getByText("1234 stars")).toBeInTheDocument();
  });
});
