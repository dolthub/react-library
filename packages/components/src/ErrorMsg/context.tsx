import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";

type Props = {
  children: React.ReactNode;
  improveErrorMsgFn?: (m: string) => string;
  renderDifferentComp?: (m: string) => ReactElement | null;
};

type ErrorMsgContextType = {
  improveErrorMsg: (m: string) => string;
  renderDifferentComp?: (m: string) => ReactElement | null;
};

const ErrorMsgContext = createContext<ErrorMsgContextType>({
  improveErrorMsg: (m: string) => m,
  renderDifferentComp: () => null,
});

// ErrorMsgProvider sets improveErrorMsg and renderDifferentComp functions in
// context. Should wrap all pages that use ErrorMsg.
export default function ErrorMsgProvider({
  children,
  improveErrorMsgFn,
  renderDifferentComp,
}: Props) {
  const improveErrorMsg = useCallback(
    (msg: string): string => {
      if (isTimeoutError(msg)) {
        return "Request timed out. Please try again.";
      }
      return improveErrorMsgFn ? improveErrorMsgFn(msg) : msg;
    },
    [improveErrorMsgFn],
  );

  const value = useMemo(() => {
    return { improveErrorMsg, renderDifferentComp };
  }, [improveErrorMsg, renderDifferentComp]);

  return (
    <ErrorMsgContext.Provider value={value}>
      {children}
    </ErrorMsgContext.Provider>
  );
}

export function useErrorContext(): ErrorMsgContextType {
  return useContext(ErrorMsgContext);
}

export function isTimeoutError(err: string): boolean {
  return (
    err.includes("upstream request timeout") ||
    err.includes("query error: timeout") ||
    err.includes("Unexpected token 'u'") ||
    // Chrome and Edge
    err.includes("Unexpected token u in JSON at position 0") ||
    // Safari
    err.includes(`Unexpected identifier "upstream"`) ||
    // Firefox
    err.includes("unexpected character at line 1 column 1 of the JSON data") ||
    err.includes("Failed to fetch") ||
    err.includes("Received status code 504")
  );
}
