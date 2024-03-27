import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import MobileFormModal from "../MobileFormModal";

describe("MobileFormModal", () => {
  const onRequestCloseMock = jest.fn();
  const navContent = <div data-testid="nav-content">Navigation</div>;
  const childrenContent = <div data-testid="children-content">Content</div>;
  const backToPageText = "Previous Page";
  const formTitle = "Form Title";

  beforeEach(() => {
    onRequestCloseMock.mockClear();
  });

  it("renders correctly with all props", () => {
    render(
      <MobileFormModal
        onRequestClose={onRequestCloseMock}
        backToPage={backToPageText}
        formTitle={formTitle}
        nav={navContent}
      >
        {childrenContent}
      </MobileFormModal>,
    );

    expect(screen.getByTestId("nav-content")).toBeInTheDocument();
    expect(screen.getByText(`back to ${backToPageText}`)).toBeInTheDocument();
    expect(screen.getByText(formTitle)).toBeInTheDocument();
    expect(screen.getByTestId("children-content")).toBeInTheDocument();
  });

  it("triggers onRequestClose when go back link is clicked", () => {
    render(
      <MobileFormModal
        onRequestClose={onRequestCloseMock}
        backToPage={backToPageText}
        nav={navContent}
      >
        {childrenContent}
      </MobileFormModal>,
    );

    fireEvent.click(screen.getByLabelText("close"));
    expect(onRequestCloseMock).toHaveBeenCalledTimes(1);
  });

  it("does not display a form title when not provided", () => {
    render(
      <MobileFormModal
        onRequestClose={onRequestCloseMock}
        backToPage={backToPageText}
        nav={navContent}
      >
        {childrenContent}
      </MobileFormModal>,
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
