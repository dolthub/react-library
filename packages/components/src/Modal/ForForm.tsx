import React, { SyntheticEvent } from "react";
import { ModalButtons, ModalInner, ModalOuter, OuterProps } from ".";
import Button from "../Button";
import { Color, Shape } from "../Button/types";

type Props = OuterProps & {
  onSubmit: (e: SyntheticEvent) => void | Promise<void>;
  err?: Error;

  // Button props
  btnText: string;
  buttonDataCy?: string;
  shape?: Shape;
  color?: Color;
  // red?: boolean;
  disabled?: boolean;
  // gradient?: boolean;
};

export default function FormModal({ children, ...props }: Props) {
  return (
    <ModalOuter {...props}>
      <form onSubmit={props.onSubmit}>
        <ModalInner>{children}</ModalInner>
        <ModalButtons onRequestClose={props.onRequestClose} err={props.err}>
          <Button
            type="submit"
            shape={props.shape}
            color={props.color}
            // red={props.red}
            // gradient={props.gradient}
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
