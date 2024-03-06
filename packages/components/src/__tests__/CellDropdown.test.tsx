import { render, screen } from "@testing-library/react";
import React from "react";
import CellDropdown from "../CellDropdown";

describe("test CellDropdown", () => {
  it("renders without crashing", () => {
    render(
      <CellDropdown
        showDropdown={false}
        setShowDropdown={() => {}}
        buttonClassName=""
      >
        <div>Dropdown Content</div>
      </CellDropdown>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  // it("toggles dropdown visibility on button click", async () => {
  //   const setShowDropdown = jest.fn();
  //   render(
  //     <CellDropdown
  //       showDropdown={false}
  //       setShowDropdown={setShowDropdown}
  //       buttonClassName=""
  //     >
  //       <div>Dropdown Content</div>
  //     </CellDropdown>,
  //   );

  //   const button = screen.getByRole("button");
  //   await userEvent.click(button);
  //   expect(setShowDropdown).toHaveBeenCalledWith(true);
  // });

  // it("closes dropdown when clicking outside", async () => {
  //   const setShowDropdown = jest.fn();
  //   render(
  //     <div>
  //       <CellDropdown
  //         showDropdown={true}
  //         setShowDropdown={setShowDropdown}
  //         buttonClassName=""
  //       >
  //         <div>Dropdown Content</div>
  //       </CellDropdown>
  //       <div data-testid="outside">Outside Area</div>
  //     </div>,
  //   );

  //   const outsideArea = screen.getByTestId("outside");
  //   await userEvent.click(outsideArea);
  //   expect(setShowDropdown).toHaveBeenCalledWith(false);
  // });

  // it("applies correct class based on `forRow` prop", () => {
  //   const { rerender } = render(
  //     <CellDropdown
  //       showDropdown={false}
  //       setShowDropdown={() => {}}
  //       buttonClassName=""
  //       forRow={false}
  //     >
  //       <div>Dropdown Content</div>
  //     </CellDropdown>,
  //   );

  //   expect(screen.getByRole("button")).not.toHaveClass("rowButton"); // Adapt class names as necessary

  //   rerender(
  //     <CellDropdown
  //       showDropdown={false}
  //       setShowDropdown={() => {}}
  //       buttonClassName=""
  //       forRow={true}
  //     >
  //       <div>Dropdown Content</div>
  //     </CellDropdown>,
  //   );

  //   expect(screen.getByRole("button")).toHaveClass("rowButton"); // Adapt class names as necessary
  // });
});
