import { IoIosArrowDropleftCircle } from "@react-icons/all-files/io/IoIosArrowDropleftCircle";
import React, { ReactNode } from "react";
import Button from "../Button";
import css from "./index.module.css";

export type Props = {
  onRequestClose: () => void;
  backToPage: string;
  formTitle?: string;
  nav: ReactNode;
  children: ReactNode;
};

export default function MobileFormModal(props: Props) {
  return (
    <div className={css.container}>
      {props.nav}
      <div className={css.top}>
        <Button.Link
          className={css.goback}
          onClick={props.onRequestClose}
          data-cy="close-modal"
          aria-label="close"
        >
          <IoIosArrowDropleftCircle /> back to {props.backToPage}
        </Button.Link>
        {props.formTitle && <h2>{props.formTitle}</h2>}
      </div>
      {props.children}
    </div>
  );
}
