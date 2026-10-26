import React from "react";
import ReactPopup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import type { PopupProps as ReactPopupProps } from "reactjs-popup/dist/types.d";

// reactjs-popup types `trigger` with the global JSX namespace, which React 19
// types no longer provide.
export type PopupProps = Omit<ReactPopupProps, "trigger"> & {
  trigger?: React.JSX.Element | ((isOpen: boolean) => React.JSX.Element);
};

export default function Popup(props: PopupProps) {
  return (
    <ReactPopup
      {...props}
      contentStyle={{
        borderRadius: "0.5rem",
        border: "none",
        boxShadow: "0 0 4px 0 rgba(145, 164, 168, 0.5)",
        ...props.contentStyle,
      }}
    >
      {props.children}
    </ReactPopup>
  );
}
