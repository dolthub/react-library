import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import CommentFormProvider, { useCommentFormContext } from "../commentForm";

function MockComponent() {
  const {
    comment,
    setComment,
    onSubmit,
    commentFormIsVisible,
    commentFormRef,
  } = useCommentFormContext();
  return (
    <div ref={commentFormRef}>
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        data-testid="textarea"
      />
      <button onClick={onSubmit} type="button">
        Submit
      </button>
      {commentFormIsVisible && <div>Form is visible</div>}
    </div>
  );
}

describe("CommentFormProvider", () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
  });

  it("initializes with default values", () => {
    render(
      <CommentFormProvider
        containerId="testContainer"
        commentId="testComment"
        createComment={jest.fn()}
        loading={false}
      >
        <MockComponent />
      </CommentFormProvider>,
    );

    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByTestId("textarea")).toHaveValue("");
    expect(screen.getByText("Form is visible")).toBeInTheDocument();
  });

  it("updates comment on input change", () => {
    render(
      <CommentFormProvider
        containerId="testContainer"
        commentId="testComment"
        createComment={jest.fn()}
        loading={false}
      >
        <MockComponent />
      </CommentFormProvider>,
    );

    const input: HTMLTextAreaElement = screen.getByTestId("textarea");
    fireEvent.change(input, { target: { value: "New Comment" } });

    expect(input.value).toBe("New Comment");
  });

  it("submits the form correctly", async () => {
    const mockCreateComment = jest.fn().mockResolvedValue(true);
    render(
      <CommentFormProvider
        containerId="testContainer"
        commentId="testComment"
        createComment={mockCreateComment}
        loading={false}
      >
        <MockComponent />
      </CommentFormProvider>,
    );

    const input: HTMLTextAreaElement = screen.getByTestId("textarea");
    fireEvent.change(input, { target: { value: "New Comment" } });
    fireEvent.click(screen.getByText("Submit"));

    await act(async () => {
      expect(mockCreateComment).toHaveBeenCalledWith("New Comment");
    });
    expect(input.value).toBe("");
  });

  it("handles form visibility correctly during window resize", () => {
    render(
      <CommentFormProvider
        containerId="testContainer"
        commentId="testComment"
        createComment={jest.fn()}
        loading={false}
      >
        <MockComponent />
      </CommentFormProvider>,
    );

    act(() => {
      // Simulate window resize
      global.innerWidth = 500;
      global.dispatchEvent(new Event("resize"));
    });

    expect(screen.getByText("Form is visible")).toBeInTheDocument();
  });
});
