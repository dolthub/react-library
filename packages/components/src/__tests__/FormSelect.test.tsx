import { loremer, nTimes, randomArrayItem } from "@dolthub/web-utils";
import { queryByAttribute, screen } from "@testing-library/react";
import React from "react";
import selectEvent from "react-select-event";
import FormSelect from "../FormSelect/index";
import { Option } from "../FormSelect/types";
import { getValueForOptions, moveSelectedToTop } from "../FormSelect/utils";
import { setup } from "./testUtils.test";

type StringOption = Option<string>;

const optionWithoutIconPath: StringOption[] = [...Array(5).keys()].map(i => {
  return {
    label: `test${i}`,
    value: `test${i}`,
  };
});

const iconPath =
  "https://dolthubapi.awsdev.ld-corp.com/profilePictures/u/m2lcqc5kf5324lc26td2hs0aioat0m2pbk26igfkklf68";
const optionsWithIconPath: StringOption[] = optionWithoutIconPath.map(o => {
  return {
    ...o,
    iconPath,
  };
});

const mocks = [
  { options: optionsWithIconPath },
  { options: optionWithoutIconPath },
];

describe("test FormSelect", () => {
  mocks.forEach(mock => {
    it("it renders component and is clickable", async () => {
      const onChangeValue = jest.fn();
      const { user } = setup(
        <FormSelect
          options={mock.options}
          val=""
          onChangeValue={onChangeValue}
          label="Label"
        />,
      );

      // expand the options
      await user.click(screen.getByRole("combobox"));
      mock.options.forEach(option => {
        expect(screen.getByText(option.value)).toBeVisible();
      });

      expect(screen.getByText("Label")).toBeVisible();

      // click new value
      await selectEvent.select(
        screen.getByText(mock.options[0].value),
        mock.options[1].value,
      );

      // check that onChangeValue has been called
      expect(onChangeValue).toHaveBeenCalled();
      await user.click(screen.getByRole("combobox"));

      // check img src for optionWithIconPath
      if ("iconPath" in mock.options) {
        expect(screen.getByRole("img")).toHaveAttribute("src", iconPath);
      }
    });

    it("shows the selected option first if selectedOptionFirst is true", async () => {
      const selected = randomArrayItem(mock.options);
      const { container, user } = setup(
        <FormSelect
          options={mock.options}
          val={selected.value}
          selectedOptionFirst
          onChangeValue={() => {}}
        />,
      );

      // expand the options
      await user.click(screen.getByRole("combobox"));

      // Difficult to get the inner MenuList by anything else
      const menuList = queryByAttribute("class", container, /MenuList/);
      if (!menuList) {
        throw Error("MenuList not found");
      }
      // eslint-disable-next-line testing-library/no-node-access
      expect(menuList.firstElementChild).toHaveTextContent(selected.value);
    });
  });
});

describe("test FormSelect.Async", () => {
  mocks.forEach(mock => {
    it("it renders component and is clickable", async () => {
      const onChange = jest.fn();
      const { user } = setup(
        <FormSelect.Async
          loadOptions={async () => mock.options}
          onChange={onChange}
          label="Label"
          placeholder="select or type..."
          isClearable
          defaultOptions
        />,
      );

      // expand the options
      await user.click(screen.getByRole("combobox"));
      mock.options.forEach(option => {
        expect(screen.getByText(option.value)).toBeVisible();
      });

      expect(screen.getByText("select or type...")).toBeVisible();
      expect(screen.getByText("Label")).toBeVisible();

      // click new value
      await selectEvent.select(
        screen.getByText(mock.options[0].value),
        mock.options[1].value,
      );

      // check that onChangeValue has been called
      expect(onChange).toHaveBeenCalled();
      await user.click(screen.getByRole("combobox"));

      // check img src for optionWithIconPath
      if ("iconPath" in mock.options) {
        expect(screen.getByRole("img")).toHaveAttribute("src", iconPath);
      }
    });

    it("shows the selected option first if selectedOptionFirst is true", async () => {
      const selected = randomArrayItem(mock.options);
      const { container, user } = setup(
        <FormSelect
          options={mock.options}
          val={selected.value}
          selectedOptionFirst
          onChangeValue={() => {}}
        />,
      );

      // expand the options
      await user.click(screen.getByRole("combobox"));

      // Difficult to get the inner MenuList by anything else
      const menuList = queryByAttribute("class", container, /MenuList/);
      if (!menuList) {
        throw Error("MenuList not found");
      }
      // eslint-disable-next-line testing-library/no-node-access
      expect(menuList.firstElementChild).toHaveTextContent(selected.value);
    });
  });
});

const stringOps: StringOption[] = [
  { value: "taylor", label: "Taylor" },
  { value: "katie", label: "Katie" },
  { value: "tim", label: "Tim" },
];

const stringOpsWithIcon: StringOption[] = stringOps.map(s => {
  return { ...s, iconPath: "http://www.pathtoicon.com" };
});

type RepoParams = { ownerName: string; repoName: string };
type RepoOption = Option<RepoParams>;

const repoParams: RepoParams[] = nTimes(3, () => {
  return { ownerName: loremer.word(), repoName: loremer.word() };
});

const repoParamsOps: RepoOption[] = repoParams.map(r => {
  return {
    value: r,
    label: `${r.ownerName}/${r.repoName}`,
  };
});

function repoParamsAreEqual(o: RepoParams, v: RepoParams): boolean {
  return o.repoName === v.repoName && o.ownerName === v.ownerName;
}

describe("test FormSelect utils", () => {
  it("test getValueForOptions", () => {
    // Options with string values
    expect(
      getValueForOptions<string, StringOption>("katie", stringOps),
    ).toEqual(stringOps[1]);
    expect(
      getValueForOptions<string, StringOption>("taylor", stringOps),
    ).toEqual(stringOps[0]);
    expect(
      getValueForOptions<string, StringOption>(null, stringOps),
    ).toBeNull();
    expect(
      getValueForOptions<string, StringOption>("brian", stringOps),
    ).toBeUndefined();

    // Options with icon path
    expect(
      getValueForOptions<string, StringOption>("katie", stringOpsWithIcon),
    ).toEqual(stringOpsWithIcon[1]);

    // Options with RepoParam values, which reqiure a getValFunc
    expect(
      getValueForOptions<RepoParams, RepoOption>(
        repoParams[1],
        repoParamsOps,
        repoParamsAreEqual,
      ),
    ).toEqual(repoParamsOps[1]);
  });

  it("test moveSelectedToTop", () => {
    stringOps.forEach(selected => {
      const out = moveSelectedToTop(selected.value, stringOps);
      expect(out).toHaveLength(stringOps.length);
      expect(out[0]).toEqual(selected);
    });
  });

  it("test moveSelectedToTop, does not modify options if selectedVal is null", () => {
    const out = moveSelectedToTop<string, StringOption>(null, stringOps);
    expect(out).toEqual(stringOps);
  });

  it("test moveSelectedToTop, does not modify options if selectedVal is invalid", () => {
    const out = moveSelectedToTop("some invalid value", stringOps);
    expect(out).toEqual(stringOps);
  });
});
