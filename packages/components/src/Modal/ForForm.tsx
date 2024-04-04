import React, { SyntheticEvent } from "react";
import { ModalButtons, ModalInner, ModalOuter, OuterProps } from ".";
import Button from "../Button";

type Props = OuterProps & {
  onSubmit: (e: SyntheticEvent) => void | Promise<void>;
  err?: Error;

  // Button props
  btnText: string;
  buttonDataCy?: string;
  pill?: boolean;
  red?: boolean;
  disabled?: boolean;
  gradient?: boolean;
};

export default function FormModal({ children, ...props }: Props) {
  return (
    <ModalOuter {...props}>
      <form onSubmit={props.onSubmit}>
        <ModalInner>{children}</ModalInner>
        <ModalButtons onRequestClose={props.onRequestClose} err={props.err}>
          <Button
            type="submit"
            pill={props.pill}
            red={props.red}
            gradient={props.gradient}
            disabled={props.disabled}
            data-cy={props.buttonDataCy}
          >
            {props.btnText}
          </Button>
        </ModalButtons>
      </form>
    </ModalOuter>
  );
}
