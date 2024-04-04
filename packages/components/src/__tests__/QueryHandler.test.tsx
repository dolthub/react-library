import { render, screen } from "@testing-library/react";
import React from "react";
import QueryHandler from "../QueryHandler";

const userData = {
  currentUser: {
    _id: "users/username",
    username: "new-user",
  },
};

type Props = {
  currentUser: typeof userData.currentUser;
};

function Component(props: Props) {
  return (
    <div>
      <div>My username</div>
      <div>{props.currentUser.username}</div>
    </div>
  );
}

function CustomLoader(props: { loaded?: boolean }) {
  return (
    <div aria-label="custom-loader">
      {props.loaded ? "Loaded" : "Loading..."}
    </div>
  );
}

function CustomError(props: { error?: Error }) {
  return (
    <div aria-label="custom-error">{props.error?.message ?? "no error"}</div>
  );
}

describe("tests QueryHandler", () => {
  it("renders loading state", () => {
    render(
      <QueryHandler
        result={{
          loading: true,
          data: undefined as typeof userData | undefined,
          error: undefined,
        }}
        render={data => <Component currentUser={data.currentUser} />}
      />,
    );

    expect(screen.getByRole("progressbar")).toBeVisible();
    expect(
      screen.queryByText("No data returned by the server"),
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText("error-msg")).not.toBeInTheDocument();
    expect(screen.queryByText("My username")).not.toBeInTheDocument();
    expect(screen.queryByText("new-user")).not.toBeInTheDocument();
  });

  it("renders loading state with custom loader", () => {
    render(
      <QueryHandler
        result={{
          loading: true,
          data: undefined as typeof userData | undefined,
          error: undefined,
        }}
        loaderComponent={<CustomLoader />}
        render={data => <Component currentUser={data.currentUser} />}
      />,
    );

    expect(screen.getByLabelText("custom-loader")).toHaveTextContent(
      "Loading...",
    );
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(
      screen.queryByText("No data returned by the server"),
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText("error-msg")).not.toBeInTheDocument();
    expect(screen.queryByText("My username")).not.toBeInTheDocument();
    expect(screen.queryByText("new-user")).not.toBeInTheDocument();
  });

  it("renders error state", () => {
    render(
      <QueryHandler
        result={{
          loading: false,
          data: undefined as typeof userData | undefined,
          error: new Error("user not found"),
        }}
        render={data => <Component currentUser={data.currentUser} />}
      />,
    );

    expect(screen.getByLabelText("error-msg")).toBeVisible();
    expect(screen.getByText("user not found")).toBeVisible();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(
      screen.queryByText("No data returned by the server"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("My username")).not.toBeInTheDocument();
    expect(screen.queryByText("new-user")).not.toBeInTheDocument();
  });

  it("renders error state with custom component", () => {
    render(
      <QueryHandler
        result={{
          loading: false,
          data: undefined as typeof userData | undefined,
          error: new Error("user not found"),
        }}
        errComponent={<CustomError />}
        render={data => <Component currentUser={data.currentUser} />}
      />,
    );

    expect(screen.getByLabelText("custom-error")).toHaveTextContent(
      "user not found",
    );
    expect(screen.queryByLabelText("error-msg")).not.toBeInTheDocument();
    expect(screen.getByText("user not found")).toBeVisible();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(
      screen.queryByText("No data returned by the server"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("My username")).not.toBeInTheDocument();
    expect(screen.queryByText("new-user")).not.toBeInTheDocument();
  });

  it("renders no data state with default message", () => {
    render(
      <QueryHandler
        result={{
          loading: false,
          data: undefined as typeof userData | undefined,
          error: undefined,
        }}
        render={data => <Component currentUser={data.currentUser} />}
      />,
    );

    expect(screen.getByLabelText("error-msg")).toBeVisible();
    expect(screen.getByText("No data returned by the server")).toBeVisible();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.queryByText("My username")).not.toBeInTheDocument();
    expect(screen.queryByText("new-user")).not.toBeInTheDocument();
  });

  it("renders no data state with custom message", () => {
    render(
      <QueryHandler
        result={{
          loading: false,
          data: undefined as typeof userData | undefined,
          error: undefined,
        }}
        noDataMsg="No data so sad"
        render={data => <Component currentUser={data.currentUser} />}
      />,
    );

    expect(screen.getByLabelText("error-msg")).toBeVisible();
    expect(screen.getByText("No data so sad")).toBeVisible();
    expect(
      screen.queryByText("No data returned by the server"),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.queryByText("My username")).not.toBeInTheDocument();
    expect(screen.queryByText("new-user")).not.toBeInTheDocument();
  });

  it("renders component with data", () => {
    render(
      <QueryHandler
        result={{
          loading: false,
          data: userData,
          error: undefined,
        }}
        render={data => <Component currentUser={data.currentUser} />}
      />,
    );

    expect(screen.queryByLabelText("error-msg")).not.toBeInTheDocument();
    expect(
      screen.queryByText("No data returned by the server"),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByText("My username")).toBeVisible();
    expect(screen.getByText("new-user")).toBeVisible();
  });
});
