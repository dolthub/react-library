import React, { ReactElement } from "react";
import ErrorMsg from "../ErrorMsg";
import Loader from "../Loader";

type QueryResult<Q extends object> = {
  loading: boolean;
  error?: Error;
  data?: Q | undefined;
};

type HandlerProps<Q extends object> = {
  // Component callback to render if no error and data exists
  render: (data: Q) => ReactElement;
  // Result from useQuery hook
  result: QueryResult<Q>;
  // Optional error message to return if no data
  noDataMsg?: string;
  // Optional error component to use in place of ErrorMsg. Must have prop "error"
  // for error to render.
  errComponent?: ReactElement;
  // Optional loader component to use in place of Loader.
  loaderComponent?: ReactElement;
};

// Handles loading, error, and no data states for Apollo queries in components
export default function QueryHandler<Q extends object>({
  result: { data, error, loading },
  noDataMsg = "No data returned by the server",
  render,
  errComponent,
  loaderComponent,
}: HandlerProps<Q>): ReactElement {
  if (loading) {
    return loaderComponent ? (
      React.cloneElement(loaderComponent, { loaded: false } as any)
    ) : (
      <Loader loaded={false} />
    );
  }
  if (error) {
    return errComponent ? (
      React.cloneElement(errComponent, { error } as any)
    ) : (
      <ErrorMsg err={error} />
    );
  }
  return data ? render(data) : <ErrorMsg errString={noDataMsg} />;
}
