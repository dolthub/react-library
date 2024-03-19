import { loremer, nTimes, randomArrayItem } from "@dolthub/web-utils";
import { queryByAttribute, screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";
import React from "react";
import selectEvent from "react-select-event";
import FormSelect from "../FormSelect/index";
import { CustomGroupBase, Option } from "../FormSelect/types";
import {
  getValueForOptions,
  moveSelectedToTop,
  moveSelectedToTopForGroup,
} from "../FormSelect/utils";
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
    label: `${o.label} with icon`,
    value: `${o.value} with icon`,
    iconPath,
  };
});

type Mock = { options: StringOption[]; desc: string };

const mocks: Mock[] = [
  { options: optionsWithIconPath, desc: "with iconPath" },
  { options: optionWithoutIconPath, desc: "without iconPath" },
];

async function runRenderTests(
  options: StringOption[],
  user: UserEvent,
  onChangeValue: jest.Mock,
  selectOptionIdx = 0,
) {
  // expand the options
  await user.click(screen.getByRole("combobox"));
  options.forEach(option => {
    expect(screen.getByText(option.value)).toBeVisible();
  });

  expect(screen.getByText("Label")).toBeVisible();

  // click new value
  await selectEvent.select(
    screen.getByText(options[selectOptionIdx].value),
    options[selectOptionIdx].value,
  );

  // check that onChangeValue has been called
  expect(onChangeValue).toHaveBeenCalled();

  // check img src for optionWithIconPath
  if ("iconPath" in options) {
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("img")).toHaveAttribute("src", iconPath);
  }
}

async function runSelectedOptionFirstTests(
  selected: StringOption,
  user: UserEvent,
  container: HTMLElement,
) {
  expect(await screen.findByText(selected.value)).toBeVisible();
  // expand the options
  await user.click(screen.getByRole("combobox"));

  // Difficult to get the inner MenuList by anything else
  const menuList = queryByAttribute("class", container, /MenuList/);
  if (!menuList) {
    throw Error("MenuList not found");
  }
  // eslint-disable-next-line testing-library/no-node-access
  expect(menuList.firstElementChild).toHaveTextContent(selected.value);
}

describe("test FormSelect", () => {
  mocks.forEach(mock => {
    it(`it renders component ${mock.desc}`, async () => {
      const onChangeValue = jest.fn();
      const { user } = setup(
        <FormSelect
          options={mock.options}
          val=""
          onChangeValue={onChangeValue}
          label="Label"
        />,
      );

      await runRenderTests(mock.options, user, onChangeValue);
    });

    it(`handles selectedOptionFirst ${mock.desc}`, async () => {
      const selected = randomArrayItem(mock.options);
      const { container, user } = setup(
        <FormSelect
          options={mock.options}
          val={selected.value}
          selectedOptionFirst
          onChangeValue={() => {}}
        />,
      );

      await runSelectedOptionFirstTests(selected, user, container);
    });

    it("handles no options", async () => {
      const { user } = setup(
        <FormSelect
          options={[]}
          val=""
          onChangeValue={() => {}}
          label="Label"
        />,
      );

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByText("No options")).toBeVisible();
    });

    it("handles custom no options", async () => {
      const { user } = setup(
        <FormSelect
          options={[]}
          val=""
          onChangeValue={() => {}}
          label="Label"
          noOptionsMsg="Custom no options"
        />,
      );

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByText("Custom no options")).toBeVisible();
    });
  });
});

describe("test FormSelect.Async", () => {
  mocks.forEach(mock => {
    it(`it renders component ${mock.desc}`, async () => {
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

      await runRenderTests(mock.options, user, onChange);
    });
  });

  it("handles multi values", async () => {
    const onChange = jest.fn();
    const { user } = setup(
      <FormSelect.Async
        loadOptions={async () => optionWithoutIconPath}
        onChange={onChange}
        label="Label"
        placeholder="select or type..."
        isClearable
        defaultOptions
        isMulti
      />,
    );

    const removeLabel = (idx: number) =>
      screen.getByLabelText(`remove ${optionWithoutIconPath[idx].label}`);

    await runRenderTests(optionWithoutIconPath, user, onChange, 0);
    expect(removeLabel(0)).toBeVisible();
    await runRenderTests(optionWithoutIconPath, user, onChange, 1);
    expect(removeLabel(0)).toBeVisible();
    expect(removeLabel(1)).toBeVisible();
  });
});

const groupOptions: Array<CustomGroupBase<StringOption> & { label: string }> = [
  { options: optionsWithIconPath, label: "Group 1" },
  { options: optionWithoutIconPath, label: "Group 2" },
];

const emptyGroupOptions = [{ label: "Group 1", options: [] }, groupOptions[1]];

describe("test FormSelect.Grouped", () => {
  it(`it renders component for group`, async () => {
    const onChange = jest.fn();
    const { user } = setup(
      <FormSelect.Grouped
        options={groupOptions}
        onChange={onChange}
        label="Label"
        placeholder="select or type..."
        isClearable
      />,
    );

    await runRenderTests([...groupOptions[0].options], user, onChange);

    // Click on second tab
    await user.click(screen.getByRole("combobox"));
    groupOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeVisible();
    });
    await user.click(screen.getByText(groupOptions[1].label));

    await runRenderTests([...groupOptions[1].options], user, onChange);
  });

  it(`handles selectedOptionFirst for group`, async () => {
    const selected = randomArrayItem([...groupOptions[0].options]);
    const { container, user } = setup(
      <FormSelect.Grouped
        options={groupOptions}
        value={selected}
        selectedOptionFirst
        onChange={() => {}}
      />,
    );

    await runSelectedOptionFirstTests(selected, user, container);
  });

  it("handles no options", async () => {
    const { user } = setup(
      <FormSelect.Grouped
        options={emptyGroupOptions}
        value={null}
        onChange={() => {}}
        label="Label"
      />,
    );

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByText("No options")).toBeVisible();
  });

  it("handles custom no options", async () => {
    const { user } = setup(
      <FormSelect.Grouped
        options={[
          { ...emptyGroupOptions[0], noOptionsMsg: "Custom no options" },
          emptyGroupOptions[1],
        ]}
        value={null}
        onChange={() => {}}
        label="Label"
      />,
    );

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByText("Custom no options")).toBeVisible();
  });

  it("handles footer", async () => {
    const options: Array<CustomGroupBase<StringOption>> = [
      { label: groupOptions[0].label, options: [] },
      { label: groupOptions[1].label, options: [] },
    ];

    const { user, rerender } = setup(
      <FormSelect.Grouped
        options={options}
        value={null}
        onChange={() => {}}
        label="Label"
      />,
    );

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByText("No options")).toBeVisible();

    const optionsWithFooter = [
      { ...groupOptions[0], footer: <span>Footer 1</span> },
      { ...groupOptions[1], footer: <span>Footer 2</span> },
    ];
    const selected = randomArrayItem([...optionsWithFooter[1].options]);
    rerender(
      <FormSelect.Grouped
        options={optionsWithFooter}
        value={selected}
        onChange={() => {}}
        label="Label"
      />,
    );

    expect(
      screen.getByLabelText(`single-value-${selected.label}`),
    ).toBeVisible();
    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByText("No options")).not.toBeInTheDocument();
    expect(screen.getByText("Footer 2")).toBeVisible();
    expect(screen.queryByText("Footer 1")).not.toBeInTheDocument();

    await user.click(screen.getByText(groupOptions[0].label));
    expect(screen.getByText("Footer 1")).toBeVisible();
    expect(screen.queryByText("Footer 2")).not.toBeInTheDocument();
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
    const tests = [
      { val: "katie", expected: stringOps[1] },
      { val: "taylor", expected: stringOps[0] },
      { val: null, expected: null },
      { val: "brian", expected: undefined },
      {
        val: "katie",
        stringOps: stringOpsWithIcon,
        expected: stringOpsWithIcon[1],
      },
    ];

    tests.forEach(test => {
      expect(
        getValueForOptions<string, StringOption>(
          test.val,
          test.stringOps ?? stringOps,
        ),
      ).toEqual(test.expected);
    });

    // Options with RepoParam values, which require a getValFunc
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

  it("test moveSelectedToTopForGroup", () => {
    const selected = groupOptions[1].options[1];
    const out = moveSelectedToTopForGroup(selected, groupOptions);
    expect(out).toHaveLength(groupOptions.length);
    expect(out).toBeDefined();
    if (!out || !("options" in out[1])) return;
    expect(out[1].options[0]).toEqual(selected);

    const outNull = moveSelectedToTopForGroup(null, groupOptions);
    expect(outNull).toEqual(groupOptions);
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
