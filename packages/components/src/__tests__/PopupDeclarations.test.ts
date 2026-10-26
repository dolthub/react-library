import path from "node:path";
import ts from "typescript";

test("published Popup declarations support React 19 without skipLibCheck", () => {
  const fileName = path.resolve(__dirname, "popup-consumer.tsx");
  const source = `
    import React from "react";
    import Popup, { PopupProps } from "../../types/Popup";

    const props: PopupProps = {
      children: "Content",
      trigger: isOpen => {
        const open: boolean = isOpen;
        // @ts-expect-error The callback parameter must not be any.
        const invalid: string = isOpen;
        return <button>{open ? "Close" : "Open"}</button>;
      },
      on: ["click", "focus"],
      position: ["top left", "bottom center"],
    };
    const popup = <Popup {...props} />;
  `;
  const options: ts.CompilerOptions = {
    strict: true,
    skipLibCheck: false,
    noEmit: true,
    esModuleInterop: true,
    jsx: ts.JsxEmit.React,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    types: [],
  };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (
    name,
    languageVersion,
    onError,
    shouldCreateNewSourceFile,
  ) =>
    name === fileName
      ? ts.createSourceFile(
          name,
          source,
          languageVersion,
          true,
          ts.ScriptKind.TSX,
        )
      : getSourceFile(
          name,
          languageVersion,
          onError,
          shouldCreateNewSourceFile,
        );
  const program = ts.createProgram([fileName], options, host);
  const errors = ts
    .getPreEmitDiagnostics(program)
    .map(diagnostic =>
      ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
    );
  expect(errors).toEqual([]);
});
