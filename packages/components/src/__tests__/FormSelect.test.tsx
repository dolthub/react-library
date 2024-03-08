import { loremer, nTimes, randomArrayItem } from "@dolthub/web-utils";
import { queryByAttribute, screen } from "@testing-library/react";
import React from "react";
import selectEvent from "react-select-event";
import FormSelect from "../FormSelect/index";
import { Option } from "../FormSelect/types";
import { getValueForOptions, moveSelectedToTop } from "../FormSelect/utils";
import { setup } from "./testUtils.test";

const optionWithoutIconPath: Option[] = [...Array(5).keys()].map(i => {
  return {
    label: `test${i}`,
    value: `test${i}`,
  };
});

const iconPath =
  "https://dolthubapi.awsdev.ld-corp.com/profilePictures/u/m2lcqc5kf5324lc26td2hs0aioat0m2pbk26igfkklf68";
const optionsWithIconPath: Option[] = optionWithoutIconPath.map(o => {
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
        />,
      );

      // expand the options
      await user.click(screen.getByRole("combobox"));
      mock.options.forEach(option => {
        expect(screen.getByText(option.value)).toBeVisible();
      });

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
      expect(menuList.firstElementChild).toHaveTextContent(selected.value);
    });
  });
});

const stringOps: Option[] = [
  { value: "taylor", label: "Taylor" },
  { value: "katie", label: "Katie" },
  { value: "tim", label: "Tim" },
];

const stringOpsWithIcon: Option[] = stringOps.map(s => {
  return { ...s, iconPath: "http://www.pathtoicon.com" };
});

type RepoParams = { ownerName: string; repoName: string };

const repoParams: RepoParams[] = nTimes(3, () => {
  return { ownerName: loremer.word(), repoName: loremer.word() };
});

const repoParamsOps: Option[] = repoParams.map(r => {
  return {
    value: r,
    label: `${r.ownerName}/${r.repoName}`,
  };
});

function repoParamsAreEqual(o: RepoParams, v: RepoParams): boolean {
  return o.repoName === v.repoName && o.ownerName === v.ownerName;
}

describe("test FormSelect utils", () => {
  it("gets value for options", () => {
    // Options with string values
    expect(getValueForOptions<Option>("katie", stringOps)).toEqual(
      stringOps[1],
    );
    expect(getValueForOptions<Option>("taylor", stringOps)).toEqual(
      stringOps[0],
    );
    expect(getValueForOptions<Option>(null, stringOps)).toBeNull();
    expect(getValueForOptions<Option>("brian", stringOps)).toBeUndefined();

    // Options with icon path
    expect(getValueForOptions<Option>("katie", stringOpsWithIcon)).toEqual(
      stringOpsWithIcon[1],
    );

    // Options with RepoParam values, which reqiure a getValFunc
    expect(
      getValueForOptions<Option>(
        repoParams[1],
        repoParamsOps,
        repoParamsAreEqual,
      ),
    ).toEqual(repoParamsOps[1]);
  });

  it("moves the selected item to the top of the array", () => {
    stringOps.forEach(selected => {
      const out = moveSelectedToTop(selected.value, stringOps);
      expect(out).toHaveLength(stringOps.length);
      expect(out[0]).toEqual(selected);
    });
  });

  it("does not modify options if selectedVal is null", () => {
    const out = moveSelectedToTop(null, stringOps);
    expect(out).toEqual(stringOps);
  });

  it("does not modify options if selectedVal is invalid", () => {
    const out = moveSelectedToTop("some invalid value", stringOps);
    expect(out).toEqual(stringOps);
  });
});
