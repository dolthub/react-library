import { screen } from "@testing-library/react";
import React from "react";
import Checkbox from "../Checkbox";
import { setup } from "./testUtils.test";

describe("test Checkbox", () => {
  const mocks = [
    { name: "one", label: "one-label" },
    { name: "two", label: "two-label" },
    { name: "three", label: "three-label" },
  ];

  mocks.forEach((mock, ind) => {
    it(`renders Checkbox for of label ${mock.label}`, async () => {
      const onChangeValue = jest.fn();

      const checked = ind % 2 === 0;

      const { user } = setup(
        <Checkbox
          name={mock.name}
          onChange={onChangeValue}
          checked={checked}
          className="classname"
          label={mock.label}
        />,
      );

      const content = screen.getByLabelText(mock.label);
      expect(content).toBeVisible();

      const input = screen.getByRole("checkbox");
      if (checked) {
        expect(input).toBeChecked();
      } else {
        expect(input).not.toBeChecked();
      }

      await user.click(screen.getByLabelText(mock.label));
      expect(onChangeValue).toHaveBeenCalled();
    });
  });
});
