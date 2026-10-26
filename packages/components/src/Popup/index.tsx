import React from "react";
import ReactPopup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// Keep the public declarations independent of reactjs-popup's global JSX types.
type PopupEvent = "hover" | "click" | "focus" | "right-click";
type PopupPosition =
  | "top left"
  | "top center"
  | "top right"
  | "right top"
  | "right center"
  | "right bottom"
  | "bottom left"
  | "bottom center"
  | "bottom right"
  | "left top"
  | "left center"
  | "left bottom"
  | "center center";

export type PopupProps = {
  trigger?: React.JSX.Element | ((isOpen: boolean) => React.JSX.Element);
  open?: boolean;
  disabled?: boolean;
  nested?: boolean;
  defaultOpen?: boolean;
  on?: PopupEvent | PopupEvent[];
  children: React.ReactNode;
  position?: PopupPosition | PopupPosition[];
  offsetX?: number;
  offsetY?: number;
  arrow?: boolean;
  modal?: boolean;
  lockScroll?: boolean;
  closeOnDocumentClick?: boolean;
  closeOnEscape?: boolean;
  repositionOnResize?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onOpen?: (event?: React.SyntheticEvent) => void;
  onClose?: (
    event?: React.SyntheticEvent | KeyboardEvent | TouchEvent | MouseEvent,
  ) => void;
  contentStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  arrowStyle?: React.CSSProperties;
  className?: string;
  keepTooltipInside?: boolean | string;
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
