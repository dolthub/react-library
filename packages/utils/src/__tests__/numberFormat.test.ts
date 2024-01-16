import { formatNumber, formatToRoundedUsd, formatToUsd } from "../numberFormat";

describe("formatNumber", () => {
  it("formats whole numbers correctly", () => {
    expect(formatNumber(0)).toEqual("0");
    expect(formatNumber(5)).toEqual("5");
    expect(formatNumber(600)).toEqual("600");
    expect(formatNumber(140045)).toEqual("140,045");
  });
  it("formats numbers with decimals", () => {
    expect(formatNumber(0.0)).toEqual("0");
    expect(formatNumber(5.1)).toEqual("5.1");
    expect(formatNumber(600.009)).toEqual("600.009");
    expect(formatNumber(140045.994)).toEqual("140,045.994");
  });
});

describe("formatToUsd", () => {
  it("formats whole numbers correctly", () => {
    expect(formatToUsd(0)).toEqual("$0.00");
    expect(formatToUsd(5)).toEqual("$5.00");
    expect(formatToUsd(600)).toEqual("$600.00");
    expect(formatToUsd(140045)).toEqual("$140,045.00");
  });
  it("formats numbers with decimals correctly", () => {
    expect(formatToUsd(0.0)).toEqual("$0.00");
    expect(formatToUsd(5.1)).toEqual("$5.10");
    expect(formatToUsd(600.009)).toEqual("$600.01");
    expect(formatToUsd(140045.994)).toEqual("$140,045.99");
  });
});

describe("formatToRoundedUsd", () => {
  it("formats whole numbers correctly", () => {
    expect(formatToRoundedUsd(0)).toEqual("$0");
    expect(formatToRoundedUsd(5)).toEqual("$5");
    expect(formatToRoundedUsd(600)).toEqual("$600");
    expect(formatToRoundedUsd(140045)).toEqual("$140,045");
  });
  it("formats numbers with decimals correctly", () => {
    expect(formatToRoundedUsd(0.0)).toEqual("$0");
    expect(formatToRoundedUsd(5.1)).toEqual("$5");
    expect(formatToRoundedUsd(600.009)).toEqual("$600");
    expect(formatToRoundedUsd(140045.994)).toEqual("$140,046");
  });
});
