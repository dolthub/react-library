import { nTimes } from "@dolthub/web-utils";
import { render, screen } from "@testing-library/react";
import React from "react";
import CharCount from "../CharCount";
import css from "./index.module.css";

const tilde = () => "~";

const mocks = [
  { words: "", over: false },
  { words: nTimes(9, tilde).join(""), over: false },
  { words: nTimes(2050, tilde).join(""), over: true },
];

describe("test CharCount", () => {
  mocks.forEach(mock => {
    it(`renders CharCount for word length of ${mock.words.length}`, () => {
      render(<CharCount desc={mock.words} className="classname" />);

      const content = screen.getByText(`${mock.words.length}/2048`);
      expect(content).toBeVisible();
      expect(content).toHaveClass(css.charCount);
      expect(content).toHaveClass("classname");

      if (mock.over) {
        expect(content).toHaveClass(css.charCountOver);
      }
    });
  });
});
