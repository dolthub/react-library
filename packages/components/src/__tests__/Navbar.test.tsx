import { render, screen } from "@testing-library/react";
import React from "react";
import DesktopNavbar from "../Navbar/ForDesktop";
import MobileNavbar from "../Navbar/ForMobile";
import { setup } from "./testUtils.test";

describe("test DesktopNavar", () => {
  const leftLinks = <div>Left Links</div>;
  const logo = <div>Logo</div>;
  const rightLinks = <div>Right Links</div>;

  it("renders with all props provided", () => {
    render(
      <DesktopNavbar
        leftLinks={leftLinks}
        logo={logo}
        rightLinks={rightLinks}
        large
        dark
        logoLeft
      />,
    );

    expect(screen.getByText("Left Links")).toBeInTheDocument();
    expect(screen.getByText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Right Links")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toHaveClass(
      "container",
      "large",
      "dark",
      "bg-background-acc-1",
    );
  });

  it("applies default and conditional styling", () => {
    render(
      <DesktopNavbar
        leftLinks={leftLinks}
        logo={logo}
        rightLinks={rightLinks}
      />,
    );

    // Checks for default classes
    expect(screen.getByRole("banner")).toHaveClass(
      "container",
      "bg-background-acc-1",
    );
    // Checks that conditional classes are not applied
    expect(screen.getByRole("banner")).not.toHaveClass(
      "large",
      "dark",
      "logoLeft",
    );
  });

  it("overrides default background color", () => {
    const customBgColor = "bg-custom-color";
    render(
      <DesktopNavbar
        leftLinks={leftLinks}
        logo={logo}
        rightLinks={rightLinks}
        bgColor={customBgColor}
      />,
    );

    expect(screen.getByRole("banner")).toHaveClass("container", customBgColor);
    expect(screen.getByRole("banner")).not.toHaveClass("bg-background-acc-1");
  });
});

describe("test MobileNavbar", () => {
  const logo = <div>Logo</div>;
  const children = <div>Children Content</div>;
  const leftLinks = <div>Mobile Left Links</div>;

  const mobileBottomLinks = <div>Mobile Bottom Links</div>;

  it("does not show the navigation menu initially", () => {
    render(
      <MobileNavbar logo={logo} mobileBottomLinks={mobileBottomLinks}>
        {children}
      </MobileNavbar>,
    );
    expect(screen.queryByText("Children Content")).not.toBeInTheDocument();
    expect(screen.queryByText("Mobile Bottom Links")).not.toBeInTheDocument();
  });

  it("renders a navigation menu with provided left links", () => {
    render(
      <MobileNavbar logo={logo} mobileBottomLinks={mobileBottomLinks}>
        {leftLinks}
      </MobileNavbar>,
    );
    expect(screen.queryByText("Mobile Left Links")).not.toBeInTheDocument();
  });

  it("opens the navigation menu when the menu button is clicked", async () => {
    const { user } = setup(
      <MobileNavbar logo={logo} mobileBottomLinks={mobileBottomLinks}>
        {children}
      </MobileNavbar>,
    );
    await user.click(screen.getByLabelText("open mobile navbar menu"));
    expect(screen.getByText("Children Content")).toBeInTheDocument();
    expect(screen.getByText("Mobile Bottom Links")).toBeInTheDocument();
  });

  it("closes the navigation menu when the close button is clicked", async () => {
    const { user } = setup(
      <MobileNavbar logo={logo} mobileBottomLinks={mobileBottomLinks}>
        {children}
      </MobileNavbar>,
    );
    await user.click(screen.getByLabelText("open mobile navbar menu"));
    expect(screen.getByText("Children Content")).toBeInTheDocument(); // Menu is open

    await user.click(screen.getByLabelText("close mobile navbar menu"));
    expect(screen.queryByText("Children Content")).not.toBeInTheDocument(); // Menu is closed
  });

  it("applies custom background color", async () => {
    const bgColor = "bg-custom-color";
    const { user } = setup(
      <MobileNavbar logo={logo} bgColor={bgColor}>
        {children}
      </MobileNavbar>,
    );

    await user.click(screen.getByLabelText("open mobile navbar menu"));
    const tops = screen.getAllByLabelText("mobile navbar top");
    tops.forEach(top => {
      expect(top).toHaveClass(bgColor);
    });
    expect(screen.getByLabelText("mobile nav menu")).toHaveClass(bgColor);
  });

  it("applies transparent background color", async () => {
    const bgColor = "bg-transparent";
    const { user } = setup(
      <MobileNavbar logo={logo} bgColor={bgColor}>
        {children}
      </MobileNavbar>,
    );

    await user.click(screen.getByLabelText("open mobile navbar menu"));
    const tops = screen.getAllByLabelText("mobile navbar top");
    tops.forEach(top => {
      expect(top).toHaveClass(bgColor);
    });
    expect(screen.getByLabelText("mobile nav menu")).toHaveClass(
      "bg-background-acc-1",
    );
  });
});
