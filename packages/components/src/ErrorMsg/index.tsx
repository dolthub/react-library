import cx from "classnames";
import React from "react";

type Props = {
  err?: Error;
  errString?: string;
  className?: string;
  improveErrorMsg?: (msg: string) => string;
};

export default function ErrorMsg({
  err,
  errString,
  className,
  improveErrorMsg = msg => msg,
}: Props) {
  const msg = (() => {
    if (err) return improveErrorMsg(err.message);
    if (errString) return improveErrorMsg(errString);
    return null;
  })();
  if (!msg) return null;
  // if (msg.includes(gqlEmailNotVerified)) {
  //   return <EmailVerificationMessage className={className} />;
  // }

  const splitMsg = msg.split("\n").filter(Boolean);

  // TODO(css)
  return (
    <div className={cx(className)} data-cy="error-msg" aria-label="error-msg">
      {splitMsg.map(m => (
        <div key={m}>{m}</div>
      ))}
    </div>
  );
}

// function EmailVerificationMessage(props: Props) {
//   const { onResend, resendErr, success } = useResendVerifyEmail();
//   return (
//     <div
//       className={cx("error-msg", css.errorMsg, props.className)}
//       data-cy="error-msg"
//     >
//       Please verify your email address to proceed.{" "}
//       {success ? (
//         <div>Email sent!</div>
//       ) : (
//         <Button.Link onClick={onResend}>Resend verification email.</Button.Link>
//       )}
//       {resendErr && <span>Error resending: {resendErr.message}</span>}
//     </div>
//   );
// }
