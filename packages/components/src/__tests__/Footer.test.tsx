import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import Footer from "../Footer";

const logo = <img src="dolthub.com" alt="dolthub" data-testid="test-logo" />;

describe("Footer", () => {
  it("renders the footer with basic props", () => {
    const companyName = "Test Company";
    render(<Footer companyName={companyName} logo={logo} />);

    expect(screen.getByLabelText("site-footer")).toBeInTheDocument();
    expect(screen.getByTestId("test-logo")).toBeInTheDocument();
    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`,
      ),
    ).toBeInTheDocument();
  });

  it("includes version when provided", () => {
    const version = "1.0.0";
    render(<Footer companyName="Test Company" version={version} logo={logo} />);

    expect(screen.getByLabelText("version")).toHaveTextContent(version);
  });

  it("renders topLinks and socialLinks when provided", () => {
    const topLinks = [{ name: "About Us", href: "#about" }];
    const socialLinks = [
      { icon: <div>Social Icon</div>, label: "Social Link", href: "#social" },
    ];
    render(
      <Footer
        companyName="Test Company"
        topLinks={topLinks}
        socialLinks={socialLinks}
        logo={logo}
      />,
    );

    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByLabelText("Social Link")).toBeInTheDocument();
  });

  it("displays the bottom button when provided", () => {
    const bottomButton = <button type="button">Bottom Button</button>;
    render(
      <Footer
        companyName="Test Company"
        bottomButton={bottomButton}
        logo={logo}
      />,
    );

    expect(screen.getByText("Bottom Button")).toBeInTheDocument();
  });

  it("shows powered by text if provided in logo props", () => {
    const poweredBy = "Another Company";
    render(
      <Footer companyName="Test Company" logo={logo} poweredBy={poweredBy} />,
    );

    expect(screen.getByText(`Powered by ${poweredBy}`)).toBeInTheDocument();
  });
});
