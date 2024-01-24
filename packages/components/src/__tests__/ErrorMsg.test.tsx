import { render, screen } from "@testing-library/react";
import React from "react";
import ErrorMsg from "../ErrorMsg";

const errMsg = "Shit, something went wrong";
const userErr = `A username was specified but the corresponding user was not found`;

function improveErrorMsg(m: string): string {
  return m === userErr ? "Error: User not found" : m;
}

describe("test ErrorMsg", () => {
  it("improves Errors", () => {
    render(
      <ErrorMsg err={new Error(userErr)} improveErrorMsg={improveErrorMsg} />,
    );
    const result = screen.getByText("Error: User not found");
    expect(result).toBeVisible();
  });

  it("improves strings", () => {
    render(<ErrorMsg errString={userErr} improveErrorMsg={improveErrorMsg} />);
    const result = screen.getByText("Error: User not found");
    expect(result).toBeVisible();
  });

  it("renders the err if both err and errString provided", () => {
    render(<ErrorMsg errString={userErr} err={new Error(errMsg)} />);
    expect(screen.getByText(errMsg)).toBeVisible();
    expect(screen.queryByText(userErr)).not.toBeInTheDocument();
  });

  // it("handles email verification error", () => {
  //   render(
  //     <MockedProvider mocks={emailVerMocks}>
  //       <ErrorMsg errString={gqlEmailNotVerified} className="class-name" />
  //     </MockedProvider>,
  //   );
  //   const verMsg = screen.getByText(
  //     "Please verify your email address to proceed.",
  //   );
  //   expect(verMsg).toBeVisible();
  //   expect(verMsg).toHaveClass("class-name");
  //   expect(screen.getByText("Resend verification email.")).toBeVisible();
  // });
});
