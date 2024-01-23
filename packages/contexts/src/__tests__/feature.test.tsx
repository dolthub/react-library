import {
  FeatureMap,
  getFeatures,
  getFeaturesForShowAll,
} from "../features/feature";

const showAllMap: FeatureMap = new Map([
  ["bounties", true],
  ["test", true],
  ["marketing", true],
]);

const isDev = false;
const initialMap: FeatureMap = new Map([
  ["bounties", true],
  ["test", false],
  ["marketing", isDev],
]);

describe("test getFeatures", () => {
  it("returns feature map", () => {
    expect(getFeatures(initialMap)).toStrictEqual(initialMap);
    expect(getFeatures(initialMap, false)).toStrictEqual(initialMap);
    expect(getFeatures(initialMap, true)).toStrictEqual(showAllMap);
    expect(getFeatures(initialMap, false)).toStrictEqual(initialMap);
    expect(getFeatures(initialMap, true)).toStrictEqual(showAllMap);
    expect(getFeaturesForShowAll(initialMap)).toStrictEqual(showAllMap);
  });
});
