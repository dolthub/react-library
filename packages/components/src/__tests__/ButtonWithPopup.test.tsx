import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import ButtonWithPopup, { Props } from "../ButtonWithPopup";

// Taken from https://github.com/yjose/reactjs-popup/blob/master/__test__/index.test.tsx

function SimplePopup({ ...props }: Partial<Props>) {
  return (
    <ButtonWithPopup triggerText="trigger" {...props}>
      <span> popup Content </span>
    </ButtonWithPopup>
  );
}
const popupContentShouldntExist = () => {
  expect(screen.queryByText(/popup Content/)).not.toBeInTheDocument();
};
const popupContentShouldExist = () => {
  expect(screen.getByText(/popup Content/)).toBeInTheDocument();
};

describe("test ButtonWithPopup ", () => {
  test("should render trigger correctly", () => {
    render(<SimplePopup />);
    expect(screen.getByText(/trigger/)).toBeInTheDocument();
  });

  test("should be a tooltip by default", () => {
    render(<SimplePopup />);
    fireEvent.click(screen.getByText("trigger"));
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  test("should use open props to open", async () => {
    const setIsOpen = jest.fn();
    render(<SimplePopup isOpen={false} setIsOpen={setIsOpen} />);
    fireEvent.click(screen.getByText("trigger"));
    await waitFor(() => expect(setIsOpen).toHaveBeenCalledWith(true));
  });

  test("should use open props to close", async () => {
    const setIsOpen = jest.fn();
    render(<SimplePopup isOpen setIsOpen={setIsOpen} />);
    fireEvent.click(screen.getByText("trigger"));
    await waitFor(() => expect(setIsOpen).toHaveBeenCalledWith(false));
  });

  test("no Arrow for modal", () => {
    render(<SimplePopup modal />);
    fireEvent.click(screen.getByText("trigger"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.queryByTestId("arrow")).not.toBeInTheDocument();
  });

  test("no Arrow on arrow= false", () => {
    render(<SimplePopup arrow={false} />);
    fireEvent.click(screen.getByText("trigger"));
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.queryByTestId("arrow")).not.toBeInTheDocument();
  });

  test("should render a Modal on modal=true", () => {
    render(<SimplePopup modal />);
    fireEvent.click(screen.getByText("trigger"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("it should be closed  on disabled = true  ", () => {
    render(<SimplePopup disabled />);
    popupContentShouldntExist();
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldntExist();
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldntExist();
  });
  test("should be open by default on defaultOpen= true  ", () => {
    render(<SimplePopup defaultOpen />);
    popupContentShouldExist();
  });

  test("should call onOpen & onClose functions ", async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    render(<SimplePopup onOpen={onOpen} onClose={onClose} />);

    fireEvent.click(screen.getByText("trigger"));
    await waitFor(() => {
      expect(onOpen).toHaveBeenCalled();
    });

    const [openEvent] = onOpen.mock.calls[0];
    expect("target" in openEvent).toBe(true);
    fireEvent.click(screen.getByText("trigger"));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
    const [closeEvent] = onClose.mock.calls[0];
    expect("target" in closeEvent).toBe(true);
    // expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  test("should be closed on Escape", async () => {
    render(<SimplePopup />);
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldExist();
    fireEvent.keyUp(document, { key: "Escape", code: "Escape" });
    popupContentShouldntExist();
  });
  test("shouldnt close on Escape if closeOnEscape=false", async () => {
    render(<SimplePopup closeOnEscape={false} />);
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldExist();
    fireEvent.keyUp(document, { key: "Escape", code: "Escape" });
    popupContentShouldExist();
  });

  test("should be closed on ClickOutside ", async () => {
    render(<SimplePopup />);
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldExist();
    fireEvent.mouseDown(document);
    popupContentShouldntExist();
  });
  test("shouldnt close on ClickOutside if closeOnDocumentClick=false", async () => {
    render(<SimplePopup closeOnDocumentClick={false} />);
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldExist();
    fireEvent.mouseDown(document);
    popupContentShouldExist();
  });

  test("should lock Document Scroll on lockScroll=true", async () => {
    render(<SimplePopup lockScroll modal />);
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldExist();
    expect(document.body).toHaveStyle(`overflow: hidden`);
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldntExist();
    expect(document.body).toHaveStyle(`overflow: auto`);
  });
});

// test for "on" props status
describe('Popup Component with "on" Prop ', () => {
  test("it should be opened only on Click as default value  ", () => {
    render(<SimplePopup />);
    popupContentShouldntExist();
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldExist();
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldntExist();
  });

  test('it should be opened only on Click where on="click" ', () => {
    render(<SimplePopup on="click" />);
    popupContentShouldntExist();
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldExist();
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldntExist();
  });
  test('it should be opened only on Right-Click where on="right-click" ', () => {
    render(<SimplePopup on="right-click" />);
    popupContentShouldntExist();
    fireEvent.contextMenu(screen.getByText("trigger"));
    popupContentShouldExist();
    fireEvent.contextMenu(screen.getByText("trigger"));
    popupContentShouldntExist();
  });
  test('it should be opened only on Hover where on="hover" ', async () => {
    render(<SimplePopup on="hover" />);
    popupContentShouldntExist();
    fireEvent.mouseOver(screen.getByText("trigger"));
    await waitFor(
      () => popupContentShouldExist(),
      { timeout: 120 }, // default delay = "100"
    );
    fireEvent.mouseLeave(screen.getByText("trigger"));

    await waitFor(
      () => expect(screen.queryByText(/popup Content/)).not.toBeInTheDocument(),
      { timeout: 120 },
    );
    // should not show on click
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldntExist();
  });
  test('it should be opened only on Focus where on="focus" ', async () => {
    render(<SimplePopup on="focus" />);
    popupContentShouldntExist();
    fireEvent.focus(screen.getByText("trigger"));
    await waitFor(
      () => popupContentShouldExist(),
      { timeout: 120 }, // default delay = "100"
    );
    fireEvent.blur(screen.getByText("trigger"));
    await waitFor(() => popupContentShouldntExist(), { timeout: 120 });
    // should not show content on click
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldntExist();
  });
  test('it should be opened  on Focus & click & focus where on=["focus","click","hover"] ', async () => {
    render(<SimplePopup on={["focus", "click", "hover"]} />);
    popupContentShouldntExist();
    // on focus
    fireEvent.focus(screen.getByText("trigger"));
    await waitFor(
      () => popupContentShouldExist(),
      { timeout: 120 }, // default delay = "100"
    );
    fireEvent.blur(screen.getByText("trigger"));
    await waitFor(() => popupContentShouldntExist(), { timeout: 120 });
    // on click
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldExist();
    fireEvent.click(screen.getByText("trigger"));
    popupContentShouldntExist();

    // on Hover
    fireEvent.mouseOver(screen.getByText("trigger"));
    await waitFor(
      () => popupContentShouldExist(),
      { timeout: 120 }, // default delay = "100"
    );
    fireEvent.mouseLeave(screen.getByText("trigger"));

    await waitFor(
      () => expect(screen.queryByText(/popup Content/)).not.toBeInTheDocument(),
      { timeout: 120 },
    );
  });

  test("should respect mouseEnterDelay  mouseLeaveDelay on Hover  ", async () => {
    render(
      <SimplePopup on="hover" mouseEnterDelay={800} mouseLeaveDelay={800} />,
    );
    popupContentShouldntExist();
    fireEvent.mouseOver(screen.getByText("trigger"));
    await waitFor(() => popupContentShouldntExist(), { timeout: 120 });
    await waitFor(() => popupContentShouldExist(), { timeout: 1000 });
    fireEvent.mouseLeave(screen.getByText("trigger"));

    await waitFor(() => popupContentShouldExist(), { timeout: 120 });
    await waitFor(() => popupContentShouldntExist(), { timeout: 1000 });
  });
});
