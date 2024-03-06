import { screen } from "@testing-library/react";
import React from "react";
import Radio from "../Radio";
import { setup } from "./testUtils.test";

describe("test Radio", () => {
  const mocks = [
    { name: "one", label: "one-label" },
    { name: "two", label: "two-label" },
    { name: "three", label: "three-label", description: "description" },
  ];

  mocks.forEach((mock, ind) => {
    it(`renders Radio for label ${mock.label}`, async () => {
      const checked = ind % 2 === 0;
      const disabled = ind === 2;
      const onChangeValue = jest.fn();

      const { user } = setup(
        <Radio
          {...mock}
          onChange={onChangeValue}
          checked={checked}
          className="classname"
          disabled={disabled}
          description={mock.description}
        />,
      );

      const content = screen.getByLabelText(mock.label);
      expect(content).toBeVisible();

      if (mock.description) {
        expect(screen.getByText(mock.description)).toBeVisible();
      }

      if (!disabled) {
        const input = screen.getByRole("radio");
        if (checked) {
          expect(input).toBeChecked();
        } else {
          expect(input).not.toBeChecked();
        }

        await user.click(screen.getByLabelText(mock.label));
        if (checked) {
          expect(onChangeValue).not.toHaveBeenCalled();
        } else {
          expect(onChangeValue).toHaveBeenCalled();
        }
      } else {
        expect(content).toBeDisabled();
      }
    });
  });
});
