import { nTimes } from "@dolthub/web-utils";
import { render, screen } from "@testing-library/react";
import React from "react";
import CharCount, { maxChar } from "../CharCount";
import css from "../CharCount/index.module.css";

const tilde = () => "~";

const mocks = [
  { words: "", over: false },
  { words: nTimes(9, tilde).join(""), over: false },
  { words: nTimes(2050, tilde).join(""), over: true },
  { words: nTimes(2050, tilde).join(""), over: false, max: 10000 },
];

describe("test CharCount", () => {
  mocks.forEach(mock => {
    it(`renders CharCount for word length of ${mock.words.length}`, () => {
      render(
        <CharCount
          desc={mock.words}
          className="classname"
          maxChar={mock.max}
        />,
      );

      const content = screen.getByText(
        `${mock.words.length}/${mock.max ?? maxChar}`,
      );
      expect(content).toBeVisible();
      expect(content).toHaveClass(css.charCount);
      expect(content).toHaveClass("classname");

      if (mock.over) {
        expect(content).toHaveClass(css.charCountOver);
      }
    });
  });
});
