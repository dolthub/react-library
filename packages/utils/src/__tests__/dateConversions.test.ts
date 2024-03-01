import {
  areTimeAgosEqual,
  getDateMinusHours,
  getNow,
  getTimeAgoString,
  getUTCDateAndTimeString,
  getUTCDateString,
  getUTCTimeString,
} from "../dateConversions";

describe("getUTCDateAndTimeString", () => {
  it("should convert date to UTC string", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    expect(getUTCDateAndTimeString(date)).toBe("2020-01-01 00:00:00");
  });
  it("should convert date to UTC string with time", () => {
    const date = new Date("2020-01-01T01:01:01.000Z");
    expect(getUTCDateAndTimeString(date)).toBe("2020-01-01 01:01:01");
  });
});

describe("getUTCDateString", () => {
  it("should convert date to UTC date string", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    expect(getUTCDateString(date)).toBe("2020-01-01");
  });
  it("should convert date to UTC date string with time", () => {
    const date = new Date("2020-01-01T01:01:01.000Z");
    expect(getUTCDateString(date)).toBe("2020-01-01");
  });
});

describe("getUTCTimeString", () => {
  it("should convert date to UTC time string", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    expect(getUTCTimeString(date)).toBe("00:00");
  });
  it("should convert date to UTC time string with time", () => {
    const date = new Date("2020-01-01T01:01:01.000Z");
    expect(getUTCTimeString(date)).toBe("01:01");
  });
});

describe("getDateMinusHours", () => {
  it("should return date minus hours", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    expect(getDateMinusHours(date, 1)).toEqual(
      new Date("2019-12-31T23:00:00.000Z"),
    );
  });
  it("should return date for 0 hours", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    expect(getDateMinusHours(date, 0)).toEqual(date);
  });
});

describe("getTimeAgoString", () => {
  it("should return time ago string for years ago", () => {
    const now = getNow();
    const yrsAgo = 4;
    now.setFullYear(now.getFullYear() - yrsAgo);
    expect(getTimeAgoString(now.valueOf())).toEqual(`${yrsAgo} years ago`);
  });

  it("should return time ago string for months ago", () => {
    const now = getNow();
    const monthsAgo = 4;
    const daysInMonth = 31;
    now.setDate(now.getDate() - monthsAgo * daysInMonth);
    expect(getTimeAgoString(now.valueOf())).toEqual(`${monthsAgo} months ago`);
  });

  it("should return time ago string for days ago", () => {
    const now = getNow();
    const daysAgo = 4;
    now.setDate(now.getDate() - daysAgo);
    expect(getTimeAgoString(now.valueOf())).toEqual(`${daysAgo} days ago`);
  });

  it("should return time ago string for hours ago", () => {
    const now = getNow();
    const hrsAgo = 4;
    now.setHours(now.getHours() - hrsAgo);
    expect(getTimeAgoString(now.valueOf())).toEqual(`${hrsAgo} hours ago`);
  });

  it("should return time ago string for minutes ago", () => {
    const now = getNow();
    const minsAgo = 4;
    now.setMinutes(now.getMinutes() - minsAgo);
    expect(getTimeAgoString(now.valueOf())).toEqual(`${minsAgo} minutes ago`);
  });
});

describe("areTimeAgosEqual", () => {
  it("should return true if time agos are equal", () => {
    const now = getNow();
    const hrsAgo = 4;
    now.setHours(now.getHours() - hrsAgo);
    const now2 = getNow();
    now2.setHours(now2.getHours() - hrsAgo);
    expect(areTimeAgosEqual(now, now2)).toBe(true);
  });

  it("should return false if time agos are not equal", () => {
    const now = getNow();
    now.setHours(now.getHours() - 5);
    const now2 = getNow();
    now2.setHours(now2.getHours() - 6);
    expect(areTimeAgosEqual(now, now2)).toBe(false);
  });
});
