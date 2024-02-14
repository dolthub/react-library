import { render, screen } from "@testing-library/react";
import React from "react";
import SuccessMsg from "../SuccessMsg";

describe("test SuccessMsg", () => {
  it("renders correct text", () => {
    render(<SuccessMsg className="message">Success!</SuccessMsg>);
    const words = screen.getByText("Success!");
    expect(words).toBeVisible();
    expect(words).toHaveClass("message");
  });
});
