import cx from "classnames";
import React from "react";
import { useErrorContext } from "./context";
import css from "./index.module.css";

type Props = {
  err?: Error;
  errString?: string;
  className?: string;
};

export default function ErrorMsg({ err, errString, className }: Props) {
  const { improveErrorMsg, renderDifferentComp } = useErrorContext();

  const msg = (() => {
    if (err) return improveErrorMsg(err.message);
    if (errString) return improveErrorMsg(errString);
    return null;
  })();

  if (!msg) return null;
  const customComp = renderDifferentComp ? renderDifferentComp(msg) : null;
  if (customComp !== null) {
    return React.cloneElement(customComp, {
      className: cx(css.errorMsg, className),
    } as any);
  }

  const splitMsg = msg.split("\n").filter(Boolean);
  return (
    <div
      className={cx(css.errorMsg, className)}
      aria-label="error-msg"
      data-cy="error-msg"
    >
      {splitMsg.map(m => (
        <div key={m}>{m}</div>
      ))}
    </div>
  );
}
