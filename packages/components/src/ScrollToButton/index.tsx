import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import React from "react";
import Button from "../Button";
import css from "./index.module.css";

type Props = {
  refToScroll: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
  text: string;
};

export default function ScrollToButton(props: Props) {
  if (props.isVisible) return null;
  return (
    <Button
      className={css.button}
      onClick={() => {
        props.refToScroll.current?.scrollIntoView();
      }}
      size="small"
    >
      <FaChevronDown className={css.icon} /> {props.text}
    </Button>
  );
}
